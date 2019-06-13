import path from 'path'
import fs from 'fs-extra'
import { compact, map, find, fromPairs, mapValues } from 'lodash'
import fetch from 'node-fetch'
import { differenceInMinutes } from 'date-fns'
import Octokit from '@octokit/rest'
import { Gitlab } from 'gitlab'
import twitterFollowersCount from 'twitter-followers-count'

require('dotenv').config()

const GITHUB_TOKEN = process.env.STATICGEN_GITHUB_TOKEN
const GITLAB_TOKEN = process.env.STATICGEN_GITLAB_TOKEN
const TWITTER_CONSUMER_KEY = process.env.STATICGEN_TWITTER_CONSUMER_KEY
const TWITTER_CONSUMER_SECRET = process.env.STATICGEN_TWITTER_CONSUMER_SECRET
const TWITTER_ACCESS_TOKEN_KEY = process.env.STATICGEN_TWITTER_ACCESS_TOKEN_KEY
const TWITTER_ACCESS_TOKEN_SECRET = process.env.STATICGEN_TWITTER_ACCESS_TOKEN_SECRET
const ARCHIVE_FILENAME = 'staticgen-archive.json'
const LOCAL_ARCHIVE_PATH = `tmp/${ARCHIVE_FILENAME}`
const GIST_ARCHIVE_DESCRIPTION = 'STATICGEN.COM DATA ARCHIVE'

let octokit
let gitlab
let getTwitterFollowers

function authenticate () {
  octokit = Octokit()
  octokit.authenticate({ type: 'token', token: GITHUB_TOKEN })
  gitlab = new Gitlab({ personaltoken: GITLAB_TOKEN })
  getTwitterFollowers = twitterFollowersCount({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token_key: TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  })
}

async function getProjectGitHubData (repo) {
  const [owner, repoName] = repo.split('/')
  const { data } = await octokit.repos.get({ owner, repo: repoName })
  const { stargazers_count, forks_count, open_issues_count, html_url } = data
  return { stars: stargazers_count, forks: forks_count, issues: open_issues_count, repo: html_url }
}

async function getProjectGitLabData (repo) {
  const { id, star_count, forks_count, web_url } = await gitlab.Projects.show(repo)
  const open_issues_count = (await gitlab.Issues.all({ projectId: id, state: 'opened' })).length
  return { stars: star_count, forks: forks_count, issues: open_issues_count, repo: web_url }
}

async function getAllProjectRepoData (repos) {
  const data = []
  // eslint-disable-next-line no-restricted-syntax
  for (const repoWithHost of repos) {
    const [repoHost, repo] = repoWithHost.split(':')
    // eslint-disable-next-line no-await-in-loop
    await new Promise(res => setTimeout(res, 100))
    try {
      if (repoHost === 'gitlab') {
        // eslint-disable-next-line no-await-in-loop
        const repoData = await getProjectGitLabData(repo)
        data.push([repoWithHost, repoData])
      } else {
        // eslint-disable-next-line no-await-in-loop
        const repoData = await getProjectGitHubData(repo)
        data.push([repoWithHost, repoData])
      }
    } catch (err) {
      console.error(`Could not load repository "${repo}" from ${repoHost}. Please make sure it still exists.`)
    }
  }
  return fromPairs(data)
}

async function getAllProjectData (projects) {
  const timestamp = Date.now()
  const twitterScreenNames = compact(map(projects, 'twitter'))
  const twitterFollowers = twitterScreenNames.length && await getTwitterFollowers(twitterScreenNames)
  const repos = compact(map(projects, val => val.repo ? [val.repohost || 'github', val.repo].join(':') : undefined))
  const reposData = await getAllProjectRepoData(repos)
  const data = projects.reduce((obj, { key, repo, repohost, twitter }) => {
    const twitterData = twitter ? { followers: twitterFollowers[twitter] } : {}
    const repoData = repo ? { ...(reposData[[repohost || 'github', repo].join(':')]) } : {}
    return { ...obj, [key]: [{ timestamp, ...twitterData, ...repoData }] }
  }, {})
  return { timestamp, data }
}

async function getLocalArchive () {
  try {
    return await fs.readJson(path.join(process.cwd(), LOCAL_ARCHIVE_PATH))
  } catch (e) {
    console.log('Local archive not found, fetching new data.')
  }
}

function updateLocalArchive (data) {
  return fs.outputJson(path.join(process.cwd(), LOCAL_ARCHIVE_PATH), data)
}

function getArchiveJson (archive) {
  if (archive.truncated) {
    return fetch(archive.raw_url).then(resp => resp.json())
  }
  return archive.content
}

async function getArchive () {
  const gists = await octokit.gists.getAll({ per_page: 100 })
  const gistArchive = find(gists.data, { description: GIST_ARCHIVE_DESCRIPTION })
  if (!gistArchive) {
    return
  }
  const gistArchiveContent = await octokit.gists.get({ id: gistArchive.id })
  const archive = gistArchiveContent.data.files[ARCHIVE_FILENAME]
  const archiveJson = await getArchiveJson(archive)
  return { ...archiveJson, id: gistArchive.id }
}

function createGist (content) {
  return octokit.gists.create({
    files: { [ARCHIVE_FILENAME]: { content } },
    public: true,
    description: GIST_ARCHIVE_DESCRIPTION,
  })
}

function editGist (content, id) {
  return octokit.gists.edit({ id, files: { [ARCHIVE_FILENAME]: { content } } })
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
  return differenceInMinutes(Date.now(), archive.timestamp) > 1410
}

async function run (projects) {
  const localArchive = await getLocalArchive()
  if (localArchive && !archiveExpired(localArchive)) {
    return localArchive.data
  }

  // This is synchronous.
  authenticate()

  const archive = await getArchive()
  if (archive && !archiveExpired(archive)) {
    await updateLocalArchive(archive)
    return archive.data
  }

  const projectData = await getAllProjectData(projects)
  const updatedArchive = await updateArchive(projectData, archive)
  await updateLocalArchive(updatedArchive)
  return updatedArchive.data
}

export default run
