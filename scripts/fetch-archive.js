const path = require('path')
const fs = require('fs-extra')
const axios = require('axios')
const {
  compact,
  map,
  find,
  fromPairs,
  mapValues,
  partial,
  reverse,
  sortBy
} = require('lodash')
const fetch = require('node-fetch')
const dateFns = require('date-fns')
const { Gitlab } = require('gitlab')
const twitterFollowersCount = require('twitter-followers-count')
const throttleConcurrency = require('./throttle-concurrency')

const config = {}

let github, gitlab, getTwitterFollowers

function githubInit(token) {
  const throttledAxios = throttleConcurrency(axios, 20, 30000)
  const githubRequest = async (method, endpoint, params = {}, data) => {
    const url = `https://api.github.com/${endpoint}`
    const headers = { Authorization: `token ${token}` }
    try {
      return throttledAxios({
        url,
        method,
        params,
        headers,
        ...(data ? { data } : {})
      })
    } catch (err) {
      console.error(err)
    }
  }

  return ['get', 'post', 'patch'].reduce((obj, method) => {
    return { ...obj, [method]: partial(githubRequest, method) }
  }, {})
}

function init(tokens) {
  github = githubInit(tokens.githubToken)
  gitlab = new Gitlab({ personaltoken: tokens.gitlabToken })
  getTwitterFollowers = twitterFollowersCount({
    consumer_key: tokens.twitterConsumerKey,
    consumer_secret: tokens.twitterConsumerSecret,
    access_token_key: tokens.twitterAccessTokenKey,
    access_token_secret: tokens.twitterAccessTokenSecret
  })
}

async function getProjectGitHubData(repo) {
  const { data } = await github.get(`repos/${repo}`)
  const { stargazers_count, forks_count, open_issues_count } = data
  return { s: stargazers_count, fk: forks_count, i: open_issues_count }
}

async function getProjectGitLabData(repo) {
  const { id, star_count, forks_count } = await gitlab.Projects.show(repo)
  const open_issues_count = (
    await gitlab.Issues.all({ projectId: id, state: 'opened' })
  ).length
  return { s: star_count, fk: forks_count, i: open_issues_count }
}

async function getAllProjectRepoData(repos) {
  const getRepoData = {
    github: getProjectGitHubData,
    gitlab: getProjectGitLabData
  }
  let count = 0
  const reportRepoReceived = repo => {
    count++
    console.log(`received ${count}/${repos.length} ${repo}`)
  }
  const data = repos.map(async ({ repo, repohost = 'github' }, idx, arr) => {
    const repoData = await getRepoData[repohost](repo)
    reportRepoReceived(repo)
    return [repo, repoData]
  }, [])
  return fromPairs(await Promise.all(data))
}

async function getAllProjectData(projects) {
  const twitterScreenNames = compact(map(projects, 'twitter'))
  const twitterFollowers =
    twitterScreenNames.length && (await getTwitterFollowers(twitterScreenNames))
  const repos = compact(
    map(projects, ({ repo, repohost }) => ({ repo, repohost }))
  )
  const reposData = await getAllProjectRepoData(repos)
  return projects.map(({ id, repo, twitter }) => {
    const twitterData = twitter ? { f: twitterFollowers[twitter] } : {}
    const repoData = repo ? reposData[repo] : {}
    return { id, ...twitterData, ...repoData }
  })
}

async function getLocalArchive() {
  try {
    return await fs.readJson(path.join(process.cwd(), config.localArchivePath))
  } catch (e) {
    console.log('Local archive not found, fetching new data.')
  }
}

function updateLocalArchive(data) {
  return fs.outputJson(path.join(process.cwd(), config.localArchivePath), data)
}

function getArchiveJson(archive) {
  if (archive.truncated) {
    return fetch(archive.raw_url).then(resp => resp.json())
  }
  return JSON.parse(archive.content)
}

async function getArchiveId() {
  const gists = await github.get('gists')
  const gistArchive = find(gists.data, {
    description: config.gistArchiveDescription
  })
  return gistArchive && gistArchive.id
}

async function getArchive() {
  const gistArchiveId = await getArchiveId()
  const gistArchiveContent = await github.get(`gists/${gistArchiveId}`)
  const archive = gistArchiveContent.data.files[config.archiveFilename]
  return getArchiveJson(archive)
}

function createGist(content) {
  return github.post(
    'gists',
    {},
    {
      files: { [config.archiveFilename]: { content } },
      public: true,
      description: config.gistArchiveDescription
    }
  )
}

async function editGist(content) {
  const gistArchiveId = await getArchiveId()
  const files = { [config.archiveFilename]: { content } }
  return github.patch(`gists/${gistArchiveId}`, {}, { files })
}

async function updateArchive(data, archive) {
  const updatedArchive = [[Date.now(), data], ...(archive || [])]
  const truncatedArchive =
    updatedArchive.length <= 60
      ? updatedArchive
      : reverse(sortBy(updatedArchive, ([timestamp]) => timestamp)).slice(0, 60)
  const content = JSON.stringify(truncatedArchive)
  if (archive) {
    await editGist(content)
  } else {
    await createGist(content)
  }
  return truncatedArchive
}

/**
 * Check if archive is expired. Currently set to 1410 minutes, which is 30
 * minutes short of 24 hours, just in case a daily refresh webhook gets called
 * a little early.
 */
function archiveExpired(archive) {
  const timestamps = archive.map(([timestamp]) => timestamp)
  const newestTimestamp = dateFns.max(timestamps).getTime()
  return dateFns.differenceInMinutes(Date.now(), newestTimestamp) > 1410
}

function expand(data) {
  return data.map(([timestamp, datum]) => {
    const expanded = datum.map(({ id, s, fk, i, f }) => ({
      id,
      stars: s,
      forks: fk,
      issues: i,
      followers: f
    }))
    return [timestamp, expanded]
  })
}

module.exports = async function run(
  projects,
  { archiveFilename, localArchivePath, gistArchiveDescription, ...tokens }
) {
  config.archiveFilename = archiveFilename
  config.localArchivePath = localArchivePath
  config.gistArchiveDescription = gistArchiveDescription

  const localArchive = await getLocalArchive()
  if (localArchive && !archiveExpired(localArchive)) {
    return expand(localArchive)
  }

  init(tokens)

  const archive = await getArchive()
  if (archive && !archiveExpired(archive)) {
    await updateLocalArchive(archive)
    return expand(archive)
  }

  const projectData = await getAllProjectData(projects)
  const updatedArchive = await updateArchive(projectData, archive)
  await updateLocalArchive(updatedArchive)
  return expand(updatedArchive)
}
