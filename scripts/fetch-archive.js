const path = require('path')
const fs = require('fs-extra')
const axios = require('axios')
const { compact, map, find, fromPairs, mapValues, partial } = require('lodash')
const fetch = require('node-fetch')
const { differenceInMinutes } = require('date-fns')
const { Gitlab } = require('gitlab')
const twitterFollowersCount = require('twitter-followers-count')
const throttleConcurrency = require('./throttle-concurrency')

const config = {}

let github, gitlab, getTwitterFollowers

function githubInit(token) {
  const throttledAxios = throttleConcurrency(axios, 20, 30000)
  const githubRequest = async (method, endpoint, params = {}, data) => {
    const url = `https://api.github.com/${endpoint}`
    const headers = { 'Authorization': `token ${token}` }
    try {
      return throttledAxios({ url, method, params, headers, ...(data ? { data } : {}) })
    } catch(err) {
      console.error(err)
    }
  }

  return ['get', 'post', 'patch'].reduce((obj, method) => {
    return { ...obj, [method]: partial(githubRequest, method) }
  }, {})
}

function authenticate (tokens) {
  github = githubInit(tokens.githubToken)
  gitlab = new Gitlab({ personaltoken: tokens.gitlabToken })
  getTwitterFollowers = twitterFollowersCount({
    consumer_key: tokens.twitterConsumerKey,
    consumer_secret: tokens.twitterConsumerSecret,
    access_token_key: tokens.twitterAccessTokenKey,
    access_token_secret: tokens.twitterAccessTokenSecret,
  })
}

async function getProjectGitHubData (repo) {
  const { data } = await github.get(`repos/${repo}`)
  const { stargazers_count, forks_count, open_issues_count } = data
  return { s: stargazers_count, fk: forks_count, i: open_issues_count }
}

async function getProjectGitLabData (repo) {
  const { id, star_count, forks_count } = await gitlab.Projects.show(repo)
  const open_issues_count = (await gitlab.Issues.all({ projectId: id, state: 'opened' })).length
  return { s: star_count, fk: forks_count, i: open_issues_count }
}

async function getAllProjectRepoData (repos) {
  const getRepoData = {
    github: getProjectGitHubData,
    gitlab: getProjectGitLabData,
  }
  const data = repos.map(async ({ repo, repohost = 'github' }, idx, arr) => {
    const repoData = await getRepoData[repohost](repo)
    return [repo, repoData]
  }, [])
  return fromPairs(await Promise.all(data))
}

async function getAllProjectData (projects) {
  const timestamp = Date.now()
  const twitterScreenNames = compact(map(projects, 'twitter'))
  const twitterFollowers = twitterScreenNames.length && await getTwitterFollowers(twitterScreenNames)
  const repos = compact(map(projects, ({ repo, repohost }) => ({ repo, repohost })))
  const reposData = await getAllProjectRepoData(repos)
  const data = projects.reduce((obj, { slug, repo, twitter }) => {
    const twitterData = twitter ? { f: twitterFollowers[twitter] } : {}
    const repoData = repo ? reposData[repo] : {}
    return { ...obj, [slug]: [{ t: timestamp, ...twitterData, ...repoData }] }
  }, {})
  return { timestamp, data }
}

async function getLocalArchive () {
  try {
    return await fs.readJson(path.join(process.cwd(), config.localArchivePath))
  } catch (e) {
    console.log('Local archive not found, fetching new data.')
  }
}

function updateLocalArchive (data) {
  return fs.outputJson(path.join(process.cwd(), config.localArchivePath), data)
}

function getArchiveJson (archive) {
  if (archive.truncated) {
    return fetch(archive.raw_url).then(resp => resp.json())
  }
  return JSON.parse(archive.content)
}

async function getArchive () {
  const gists = await github.get('gists')
  const gistArchive = find(gists.data, { description: config.gistArchiveDescription })
  if (!gistArchive) {
    return
  }
  const gistArchiveContent = await github.get(`gists/${gistArchive.id}`)
  const archive = gistArchiveContent.data.files[config.archiveFilename]
  const archiveJson = await getArchiveJson(archive)
  return { ...archiveJson, id: gistArchive.id }
}

function createGist (content) {
  return github.post('gists', {}, {
    files: { [config.archiveFilename]: { content } },
    public: true,
    description: config.gistArchiveDescription,
  })
}

function editGist (content, id) {
  return github.patch(`gists/${id}`, {}, { files: { [config.archiveFilename]: { content } } })
}

async function updateArchive ({ timestamp, data }, archive) {
  const preppedData = archive
    ? {
      timestamp,
      data: mapValues(data, (projectData, name) => [...projectData, ...(archive.data[name] || [])]),
    }
    : { timestamp, data }

  const content = JSON.stringify(preppedData)
  if (archive) {
    await editGist(content, archive.id)
  } else {
    await createGist(content)
  }
  return preppedData
}

/**
 * Check if archive is expired. Currently set to 1410 minutes, which is 30
 * minutes short of 24 hours, just in case a daily refresh webhook gets called
 * a little early.
 */
function archiveExpired (archive) {
  return differenceInMinutes(Date.now(), archive.timestamp) > 60
}

function expand(data) {
  return mapValues(data, datum => {
    return datum.map(({ t, s, fk, i, f }) => ({
      timestamp: t,
      stars: s,
      forks: fk,
      issues: i,
      followers: f,
    }))
  })
}

module.exports = async function run(projects, {
  archiveFilename,
  localArchivePath,
  gistArchiveDescription,
  ...tokens
}) {
  config.archiveFilename = archiveFilename
  config.localArchivePath = localArchivePath
  config.gistArchiveDescription = gistArchiveDescription

  const localArchive = await getLocalArchive()
  if (localArchive && !archiveExpired(localArchive)) {
    return expand(localArchive.data)
  }

  // This is synchronous.
  authenticate(tokens)

  const archive = await getArchive()
  if (archive && !archiveExpired(archive)) {
    await updateLocalArchive(archive)
    return expand(archive.data)
  }

  const projectData = await getAllProjectData(projects)
  const updatedArchive = await updateArchive(projectData, archive)
  await updateLocalArchive(updatedArchive)
  console.log(updatedArchive)
  return expand(updatedArchive.data)
}
