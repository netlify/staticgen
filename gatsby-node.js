require('dotenv').config()
const fs = require('fs')
const util = require('util')
const path = require('path')
const fetch = require('node-fetch')
const { pickBy, map, find, mapValues } = require('lodash')
const dateFns = require('date-fns')
const matter = require('gray-matter')
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const fetchArchive = require('./scripts/fetch-archive')

function extractRelevantProjectData (data) {
  return mapValues(data, project => {
    const timestamps = map(project, 'timestamp')
    const newestTimestamp = dateFns.max(timestamps).getTime()
    const oldestTimestamp = dateFns.min(timestamps).getTime()
    const dataAgeInDays = dateFns.differenceInDays(Date.now(), oldestTimestamp)
    const {
      followers, forks, stars, issues, repo
    } = find(project, { timestamp: newestTimestamp }) || {}
    const {
      forks: forksPrevious,
      stars: starsPrevious,
      issues: issuesPrevious,
      followers: followersPrevious,
    } = find(project, { timestamp: oldestTimestamp }) || {}
    const relevantData = {
      followers,
      forks,
      stars,
      issues,
      forksPrevious,
      starsPrevious,
      issuesPrevious,
      followersPrevious,
      dataAgeInDays,
    }
    if (repo) relevantData.repo = repo
    return relevantData
  })
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions
  const filenames = await readdir(`${__dirname}/content/projects`)
  const mapFilenames = async filename => {
    const file = await readFile(`${__dirname}/content/projects/${filename}`, 'utf8')
    const { repo, repohost, twitter } = matter(file).data
    return pickBy({ key: filename, repo, repohost, twitter }, v => v)
  }
  const projectsMeta = await Promise.all(filenames.map(mapFilenames))
  const projectsDataRaw = await fetchArchive(projectsMeta, {
    githubToken: process.env.GITHUB_TOKEN,
    gitlabToken: process.env.GITLAB_TOKEN,
    twitterAccessTokenKey: process.env.TWITTER_ACCESS_TOKEN_KEY,
    twitterAccessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
    twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    archiveFilename: 'staticgen-archive.json',
    localArchivePath: 'tmp/staticgen-archive.json',
    gistArchiveDescription: 'STATICGEN.COM DATA ARCHIVE',
  })
  const projectsData = extractRelevantProjectData(projectsDataRaw)
  Object.entries(projectsData).forEach(([ key, projectData ]) => {
    createNode({
      ...projectData,
      id: createNodeId(`project-stats-${key}`),
      parent: null,
      children: [],
      internal: {
        type: 'ProjectStats',
        contentDigest: createContentDigest(projectData),
      }
    })
  })
  return
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const projectTemplate = path.resolve('src/templates/project.js')

  const result = await graphql(`
    query loadPagesQuery {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              description
              homepage
              language
              license
              repo
              repohost
              startertemplaterepo
              templates
              title
              twitter
            }
            parent {
              ... on File {
                name
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.allMarkdownRemark.edges.forEach(({
    node: {
      html: content,
      frontmatter: {
        title,
        repo,
        homepage,
        twitter,
      },
      parent: {
        name: filename,
      },
    }
  }) => {
    createPage({
      path: filename,
      component: projectTemplate,
      context: {
        title,
        repo,
        homepage,
        twitter,
        content,
      },
    })
  })
}
