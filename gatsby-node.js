require('dotenv').config()
const fs = require('fs')
const util = require('util')
const path = require('path')
const fetch = require('node-fetch')
const { pick, pickBy, map, find, mapValues, compact, uniq } = require('lodash')
const { oneLine } = require('common-tags')
const dateFns = require('date-fns')
const matter = require('gray-matter')
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const fetchArchive = require('./scripts/fetch-archive')

function extractRelevantProjectData (data, configDays) {
  const now = Date.now()
  const timestamps = data.map(([timestamp]) => timestamp)
  const oldestTimestamp = dateFns.min(timestamps).getTime()
  const oldestDataAgeInDays = dateFns.differenceInDays(Date.now(), oldestTimestamp)
  const requiredDays = [0, ...(configDays.filter(d => d < oldestDataAgeInDays)), oldestDataAgeInDays]
  const timestampProxies = requiredDays.map(days => [days, dateFns.subDays(now, days).getTime()])
  const requiredTimestamps = timestampProxies.map(([days, timestamp]) => {
    return [days, dateFns.closestTo(timestamp, timestamps).getTime()]
  })
  return requiredTimestamps.map(([days, timestamp]) => {
    return [days, data.find(([dataTimestamp]) => timestamp === dataTimestamp)[1]]
  })
}

function getStarterTemplateRepoUrl(repo, repoHost = 'github') {
  if (!repo) {
    return
  }
  switch (repoHost) {
    case 'github': return `https://github.com/${repo}`
    case 'gitlab': return `https://gitlab.com/${repo}`
  }
}

exports.sourceNodes = async ({ graphql, actions, createNodeId, createContentDigest, getNodesByType }) => {
  const [{ siteMetadata }] = getNodesByType('Site')
  const { createNode } = actions
  const projectsPath = 'content/projects'
  const filenames = await readdir(`${__dirname}/${projectsPath}`)
  const mapFilenames = async filename => {
    const file = await readFile(`${__dirname}/${projectsPath}/${filename}`, 'utf8')
    const { repo, repohost, twitter } = matter(file).data
    const id = filename.slice(0, -3).toLowerCase()
    if (!repo) {
      console.error(oneLine`
        No repo found in the frontmatter for ${projectsPath}/${filename}, skipping. The file or
        frontmatter may be malformed.
      `)
      return
    }
    return pickBy({ id, repo, repohost, twitter }, v => v)
  }
  const projectsMeta = compact(await Promise.all(filenames.map(mapFilenames)))
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
  const days = compact(uniq(siteMetadata.sorts.map(({ days }) => days)))
  const projectsData = extractRelevantProjectData(projectsDataRaw, days)
  projectsData.forEach(([days, projects]) => {
    const data = { days, projects }
    createNode({
      ...data,
      id: createNodeId(`stats-${days}`),
      parent: null,
      children: [],
      internal: {
        type: 'ProjectStats',
        contentDigest: createContentDigest(data),
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
