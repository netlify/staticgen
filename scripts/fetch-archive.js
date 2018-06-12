require('dotenv').config()

import path from 'path'
import fs from 'fs-extra'
import { map, find, fromPairs, mapValues } from 'lodash'
import { differenceInMinutes } from 'date-fns'
import Octokit from '@octokit/rest'
import twitterFollowersCount from 'twitter-followers-count'
import https from 'https';

const GITHUB_TOKEN = process.env.STATICGEN_GITHUB_TOKEN
const TWITTER_CONSUMER_KEY = process.env.STATICGEN_TWITTER_CONSUMER_KEY
const TWITTER_CONSUMER_SECRET = process.env.STATICGEN_TWITTER_CONSUMER_SECRET
const TWITTER_ACCESS_TOKEN_KEY = process.env.STATICGEN_TWITTER_ACCESS_TOKEN_KEY
const TWITTER_ACCESS_TOKEN_SECRET = process.env.STATICGEN_TWITTER_ACCESS_TOKEN_SECRET
const PROJECTS_PATH = 'site/content/projects'
const ARCHIVE_FILENAME = 'staticgen-archive.json'
const LOCAL_ARCHIVE_PATH = `tmp/${ARCHIVE_FILENAME}`
const GIST_ARCHIVE_DESCRIPTION = 'STATICGEN.COM DATA ARCHIVE'
const PACKAGE_SIZE_URL = 'https://packagephobia.now.sh/api.json?p=';

let octokit, getTwitterFollowers

function authenticate() {
  octokit = Octokit()
  octokit.authenticate({ type: 'token', token: GITHUB_TOKEN })
  getTwitterFollowers = twitterFollowersCount({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token_key: TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  })
}

async function getProjectGitHubData(repo) {
  const [ owner, repoName ] = repo.split('/')
  const { data } = await octokit.repos.get({ owner, repo: repoName })
  const { stargazers_count, forks_count, open_issues_count } = data
  return { stars: stargazers_count, forks: forks_count, issues: open_issues_count }
}

async function getPackageSize(npm) {
  return new Promise((resolve, reject) => {
    https.get(PACKAGE_SIZE_URL + npm, (res) => {
      let str = '';
    
      res.on('data', (chunk) => {
        str += chunk;
      });
    
      res.on('end', () => {
        resolve(JSON.parse(str));
      });
    
    }).on('error', (err) => {
      reject(error);
    });
  });
}

async function getAllProjectGitHubData(repos) {
  const data = []
  for (const repo of repos) {
    await new Promise(res => setTimeout(res, 100))
    const repoData = await getProjectGitHubData(repo)
    data.push([ repo, repoData ])
  }
  return fromPairs(data)
}

async function getAllProjectPackageSizes(npms) {
  const data = []
  for (const npm of npms) {
    await new Promise(res => setTimeout(res, 100))
    const size = await getPackageSize(npm)
    data.push([ npm, size ])
  }
  return fromPairs(data)
}

async function getAllProjectData(projects) {
  const timestamp = Date.now()
  const twitterScreenNames = map(projects, 'twitter').filter(val => val)
  const twitterFollowers = twitterScreenNames.length && await getTwitterFollowers(twitterScreenNames)
  const gitHubRepos = map(projects, 'repo').filter(val => val)
  const gitHubReposData = await getAllProjectGitHubData(gitHubRepos)
  const npms = map(projects, 'npm').filter(val => val);
  const npmPackageData = await getAllProjectPackageSizes(npms);
  
  const data = projects.reduce((obj, { key, repo, npm, twitter }) => {
    const twitterData = twitter ? { followers: twitterFollowers[twitter] }
    const gitHubData = repo ? { ...(gitHubReposData[repo]) } : {}
    const npmData = npm ? npmPackageData[npm] : {}
    return { ...obj, [key]: [{ timestamp, ...twitterData, ...gitHubData, ...npmData }] }
  }, {})
  return { timestamp, data }
}

async function getLocalArchive() {
  try {
    return await fs.readJson(path.join(process.cwd(), LOCAL_ARCHIVE_PATH))
  }
  catch(e) {
    console.log('Local archive not found, fetching new data.')
  }
}

function updateLocalArchive(data) {
  return fs.outputJson(path.join(process.cwd(), LOCAL_ARCHIVE_PATH), data)
}


async function getArchive() {
  const gists = await octokit.gists.getAll({ per_page: 100 })
  const gistArchive = find(gists.data, { description: GIST_ARCHIVE_DESCRIPTION })
  if (!gistArchive) {
    return
  }
  const gistArchiveContent = await octokit.gists.get({ id: gistArchive.id })
  const archive = JSON.parse(gistArchiveContent.data.files[ARCHIVE_FILENAME].content)
  return { ...archive, id: gistArchive.id }
}

function createGist(content) {
  return octokit.gists.create({
    files: { [ARCHIVE_FILENAME]: { content } },
    public: true,
    description: GIST_ARCHIVE_DESCRIPTION,
  })
}

function editGist(content, id) {
  return octokit.gists.edit({ id, files: { [ARCHIVE_FILENAME]: { content } } })
}

async function updateArchive({ timestamp, data }, archive) {
  const preppedData = archive
    ? { timestamp, data: mapValues(data, (projectData, name) => [...projectData, ...(archive.data[name] || [])]) }
    : { timestamp, data }
  const content = JSON.stringify(preppedData)
  await archive ? editGist(content, archive.id) : createGist(content)
  return preppedData
}

/**
 * Check if archive is expired. Currently set to 1410 minutes, which is 30
 * minutes short of 24 hours, just in case a daily refresh webhook gets called
 * a little early.
 */
function archiveExpired(archive) {
  return differenceInMinutes(Date.now(), archive.timestamp) > 1410
}

async function run(projects) {
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
