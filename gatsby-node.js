require('dotenv').config()
const fs = require('fs')
const util = require('util')
const path = require('path')
const fetch = require('node-fetch')
const {
  pick,
  pickBy,
  map,
  find,
  mapValues,
  compact,
  uniq,
  last
} = require('lodash')
const unified = require('unified')
const markdownToRemark = require('remark-parse')
const remarkToRehype = require('remark-rehype')
const rehypeToHtml = require('rehype-stringify')
const { oneLine } = require('common-tags')
const dateFns = require('date-fns')
const matter = require('gray-matter')
const decamelize = require('decamelize')
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const fetchArchive = require('./scripts/fetch-archive')

function extractRelevantProjectData(data, configDays) {
  const now = Date.now()
  const timestamps = data.map(([timestamp]) => timestamp)
  const oldestTimestamp = dateFns.min(timestamps).getTime()
  const oldestDataAgeInDays = dateFns.differenceInDays(
    Date.now(),
    oldestTimestamp
  )
  const requiredDays = [
    0,
    ...configDays.filter(d => d < oldestDataAgeInDays),
    oldestDataAgeInDays
  ]
  const timestampProxies = requiredDays.map(days => [
    days,
    dateFns.subDays(now, days).getTime()
  ])
  const requiredTimestamps = timestampProxies.map(([days, timestamp]) => {
    return [days, dateFns.closestTo(timestamp, timestamps).getTime()]
  })
  return requiredTimestamps.map(([days, timestamp]) => {
    return [
      days,
      data.find(([dataTimestamp]) => timestamp === dataTimestamp)[1]
    ]
  })
}

function getStarterTemplateRepoUrl(repo, repoHost = 'github') {
  if (!repo) {
    return
  }
  switch (repoHost) {
    case 'github':
      return `https://github.com/${repo}`
    case 'gitlab':
      return `https://gitlab.com/${repo}`
  }
}

exports.sourceNodes = async ({
  graphql,
  actions,
  createNodeId,
  createContentDigest,
  getNodesByType
}) => {
  const [{ siteMetadata }] = getNodesByType('Site')
  const { createNode } = actions
  const projectsPath = 'content/projects'
  const filenames = await readdir(`${__dirname}/${projectsPath}`)
  const mapFilenames = async filename => {
    const file = await readFile(
      `${__dirname}/${projectsPath}/${filename}`,
      'utf8'
    )
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
    gistArchiveDescription: 'STATICGEN.COM DATA ARCHIVE'
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
        contentDigest: createContentDigest(data)
      }
    })
  })

  Object.entries(siteMetadata).forEach(async ([key, value]) => {
    if (key.endsWith('Markdown')) {
      const { contents: html } = await unified()
        .use(markdownToRemark)
        .use(remarkToRehype)
        .use(rehypeToHtml)
        .process(value)

      const name = decamelize(key, '-').split('-').slice(0, -1).join('-')
      const content = { name, html }

      createNode({
        ...content,
        id: createNodeId(name),
        parent: null,
        children: [],
        internal: {
          type: 'SiteMetadataMarkdownRemark',
          contentDigest: createContentDigest(content)
        }
      })
    }
  })
  return
}

async function getProjectData(graphql) {
  const { data, errors } = await graphql(`
    query loadProjectPagesQuery {
      allMarkdownRemark {
        nodes {
          html
          frontmatter {
            homepage
            language
            license
            repo
            repohost
            templates
            title
            twitter
          }
          parent {
            ... on File {
              name
              dir
            }
          }
        }
      }
      site {
        siteMetadata {
          fields {
            name
            label
          }
        }
      }
      allProjectStats {
        nodes {
          days
          projects {
            id
            followers
            stars
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  const { fields } = data.site.siteMetadata
  const allStats = data.allProjectStats.nodes.find(({ days }) => days === 0)
    .projects
  return data.allMarkdownRemark.nodes.map(
    ({ html: content, frontmatter, parent: { name: id, dir } }) => {
      const stats = allStats.find(({ id: projectId }) => id === projectId)
      return {
        id,
        dir: last(dir.split('/')),
        content,
        fields,
        frontmatter,
        stats
      }
    }
  ).filter(({ dir }) => dir === 'projects')
}

async function getPageData(graphql) {
  const { data, errors } = await graphql(`
    query loadPagesQuery {
      allMarkdownRemark {
        nodes {
          html
          frontmatter {
            title
          }
          parent {
            ... on File {
              name
              dir
            }
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  return data.allMarkdownRemark.nodes.map(
    ({ html: content, frontmatter, parent: { name: id, dir } }) => ({
      id,
      dir: last(dir.split('/')),
      content,
      frontmatter
    })
  )
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const projects = (await getProjectData(graphql)).filter(
    ({ dir }) => dir === 'projects'
  )
  const pages = (await getPageData(graphql)).filter(
    ({ dir }) => dir === 'pages'
  )
  const projectTemplate = path.resolve('src/templates/project.js')
  const pageTemplate = path.resolve('src/templates/page.js')
  projects.forEach(({ id, content, fields, frontmatter, stats }) => {
    createPage({
      path: id,
      component: projectTemplate,
      context: {
        id,
        content,
        fields,
        ...frontmatter,
        ...stats
      }
    })
  })
  pages.forEach(({ id, content, frontmatter }) => {
    createPage({
      path: id,
      component: pageTemplate,
      context: {
        content,
        ...frontmatter
      }
    })
  })
}
