import fs from 'fs'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import { reloadRoutes } from 'react-static/node'
import { map, mapValues, find, uniq, flatten, sortBy, pick, pickBy, flatMap } from 'lodash'
import decamelize from 'decamelize'
import dateFns from 'date-fns'
import { toSlug } from 'Scripts/util'
import grayMatter from 'gray-matter'
import marked from 'marked'
import yaml from 'js-yaml'
import titleCase from 'title-case'
import siteYaml from './site.yaml'
import fetchArchive from './scripts/fetch-archive'
import * as projectsMarkdown from './content/projects/*.md'
import * as pagesMarkdown from './content/pages/*.md'
import promoMarkdown from './content/promo.md'
import footerMarkdown from './content/footer.md'

const siteConfig = yaml.safeLoad(siteYaml)

const pageCache = {}

function processMarkdown(markdown, key) {
  if (pageCache[key]) {
    return pageCache[key]
  }
  const { content, data } = grayMatter(markdown)
  const html = marked(content)
  return pageCache[key] = { content: html, key: decamelize(key, '-'), ...data }
}

function mapProjectFrontMatter({
  title,
  repo,
  homepage,
  description,
  startertemplaterepo,
  content,
  twitter,
}) {
  return {
    title,
    slug: toSlug(title),
    repo,
    homepage,
    twitter,
    description,
    starterTemplateRepo: startertemplaterepo,
    content,
  }
}

function extractRelevantProjectData(data) {
  return mapValues(data, project => {
    const timestamps = map(project, 'timestamp');
    const newestTimestamp = dateFns.max(...timestamps).getTime()
    const oldestTimestamp = dateFns.min(...timestamps).getTime()
    const dataAgeInDays = dateFns.differenceInDays(Date.now(), oldestTimestamp)
    const { followers, forks, stars, issues } = find(project, { timestamp: newestTimestamp }) || {}
    const {
      forks: forksPrevious,
      stars: starsPrevious,
      issues: issuesPrevious,
      followers: followersPrevious,
    } = find(project, { timestamp: oldestTimestamp }) || {}
    return {
      followers,
      forks,
      stars,
      issues,
      forksPrevious,
      starsPrevious,
      issuesPrevious,
      followers,
      followersPrevious,
      dataAgeInDays,
    }
  })
}

/**
 * Retrieve and format all project data.
 */
async function getProjects() {
  /**
   * Get project details from frontmatter.
   */
  const projectDetails = map(projectsMarkdown, processMarkdown)

  /**
   * Get external project data.
   */
  const projectDataRaw = await fetchArchive(projectDetails)
  const projectData = extractRelevantProjectData(projectDataRaw)

  /**
   * Combine project details from frontmatter and project data from
   * external sources, using the sluggified title as the link, since
   * the sluggified titles are used as top level keys in the collected
   * external data.
   */
  const projects = projectDetails.map(project => {
    const slug = toSlug(project.title)
    const data = projectData[slug]
    const fieldValues = pick(project, map(siteConfig.fields, 'name'))
    const mappedProject = mapProjectFrontMatter(project)
    const filteredProject = pickBy({ ...mappedProject, ...data }, val => val)
    return { fieldValues, ...filteredProject, ...data }
  })

  return projects
}

/**
 * Generate dropdown filter values from frontmatter values.
 */
function generateFilters(projects) {
  return siteConfig.filters.map(filter => ({
    ...filter,
    values: sortBy(uniq(flatMap(projects, `fieldValues.${filter.field}`)))
  }))
}

/**
 * Retrieve and format markdown for unique pages.
 */
function getPages() {
  const pages = map(pagesMarkdown, processMarkdown)
  return pages.map(page => {
    const path = `/${page.key}`
    return { path, name: titleCase(path), ...page }
  })
}

export default {
  getSiteData: () => ({
    title: siteConfig.title,
    subtitle: siteConfig.subtitle,
    titleHome: siteConfig.titleHome,
    repo: siteConfig.repo,
    shareUrlSite: siteConfig.url,
    shareTextSite: siteConfig.shareText,
    shareButtons: siteConfig.shareButtons,
    pages: getPages(),
    navLinks: siteConfig.navLinks,
    footerText: marked(footerMarkdown),
    copyrightName: siteConfig.copyrightName,
  }),
  getRoutes: async () => {
    const projects = await getProjects()
    const pages = getPages()
    const promo = marked(promoMarkdown)
    return [
      {
        path: '/',
        component: 'src/Home/Home',
        getData: () => ({
          projects,
          promo,
          sorts: siteConfig.sorts,
          filters: generateFilters(projects),
          fields: siteConfig.fields,
        }),
        children: projects.map(project => ({
          path: project.slug,
          component: 'src/Project/Project',
          getData: () => ({
            ...project,
            fields: siteConfig.fields,
            shareUrl: `${siteConfig.url}/${project.slug}`,
            shareText: `${siteConfig.shareTextProjectStart}${project.title}${siteConfig.shareTextProjectEnd}`
          }),
        }))
      },
      ...pages.map(({ key, title, content }) => ({
        path: `/${key}`,
        component: 'src/Page',
        getData: () => ({
          title,
          content,
        }),
      })),
      {
        is404: true,
        component: 'src/App/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  siteRoot: siteConfig.url,
  Document: class CustomHtml extends Component {
    render () {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link type="image/x-icon" rel="shortcut icon" href="favicon.ico"/>

            <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible"/>

            <meta name="twitter:card" value={siteConfig.description}/>

            <meta property="og:title" content={siteConfig.title} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={`/images/${siteConfig.socialPreviewImage}`}/>
            <meta property="og:url" content={siteConfig.url} />
            <meta property="og:description" content={siteConfig.description}/>

            <link href='//fonts.googleapis.com/css?family=Roboto+Slab:700' rel='stylesheet' type='text/css'/>
            <link href='//fonts.googleapis.com/css?family=Roboto:100,400,600,700' rel='stylesheet' type='text/css'/>

            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
