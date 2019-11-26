const fetch = require('node-fetch')
const { compact, map } = require('lodash')
const Octokit = require('@octokit/rest')
const { Gitlab } = require('gitlab')

let octokit
let gitlab

function authenticate({ gitHubToken, gitLabToken }) {
  octokit = Octokit()
  octokit.authenticate({ type: 'token', token: gitHubToken })
  gitlab = new Gitlab({ personaltoken: gitLabToken })
}

async function getProjectGitHubData(repo) {
  const [owner, repoName] = repo.split('/')
  const { data } = await octokit.repos.get({ owner, repo: repoName })
  const { stargazers_count, forks_count, open_issues_count, html_url } = data
  return {
    stars: stargazers_count,
    forks: forks_count,
    issues: open_issues_count,
    repo: html_url,
  }
}

async function getProjectGitLabData(repo) {
  const { id, star_count, forks_count, web_url } = await gitlab.Projects.show(repo)
  const open_issues_count = (await gitlab.Issues.all({ projectId: id, state: 'opened' })).length
  return {
    stars: star_count,
    forks: forks_count,
    issues: open_issues_count,
    repo: web_url,
  }
}

async function getAllProjectRepoData(repos) {
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
      console.error(
        `Could not load repository "${repo}" from ${repoHost}. Please make sure it still exists.`
      )
    }
  }
  return fromPairs(data)
}

export default function getAllProjectData(projects, { gitHubKey, gitLabKey }) {
  authenticate({ gitHubKey, gitLabKey })
  const mapProjects = val => (val.repo ? [val.repohost || 'github', val.repo].join(':') : undefined)
  const repos = compact(map(projects, mapProjects))
  return getAllProjectRepoData(repos, { gitHubKey, gitLabKey })
}
