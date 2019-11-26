import React, { useState, useMemo } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { sortBy, uniq, flatMap, isEmpty } from 'lodash'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ControlBar from '../components/controlbar'
import ProjectCard from '../components/projectcard'
import PromoCard from '../components/promocard'

const ProjectsList = styled.ul`
  display: grid;
  justify-content: space-between;
  grid-row-gap: 32px;
  list-style-type: none;
  padding-left: 0;
  margin: 48px auto;
  max-width: 320px;

  @media (min-width: 720px) {
    grid-template-columns: 47% 47%;
    max-width: 720px;
  }

  @media (min-width: 960px) {
    grid-template-columns: 31% 31% 31%;
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 23% 23% 23% 23%;
    max-width: 1200px;
  }
`

function compare(a, b, reverse) {
  const type = typeof a
  if (type === 'number') return reverse ? b - a : a - b
  if (type === 'string') return reverse ? b.localeCompare(a) : a.localeCompare(b)
  return 0
}

function statsForDays(allStats, targetDays) {
  return allStats.find(({ days }) => targetDays === days).projects
}

function getProjectStats(allStats, id) {
  return allStats.find(({ id: projectId }) => id === projectId)
}

const IndexPage = ({ data }) => {
  const {
    allProjectStats: { nodes: allProjectStats },
    allMarkdownRemark: { nodes: allMarkdownRemark },
    allSiteMetadataMarkdownRemark: { nodes: allSiteMetadataMarkdownRemark },
    site: { siteMetadata: siteMeta },
  } = data
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState(siteMeta.sorts[0])

  const defaultPreviousDays = useMemo(() => {
    return allProjectStats.reduce((acc, { days: d }) => {
      return d > acc ? d : acc
    }, 0)
  }, [allProjectStats])

  const handleFilterChange = (filterName, e) => {
    setFilter({ ...filter, [filterName]: e.target.value })
  }

  const handleSortChange = e => {
    setSort(siteMeta.sorts[e.target.value])
  }

  const allCurrentStats = useMemo(() => statsForDays(allProjectStats, 0), [allProjectStats])
  const allPreviousStats = useMemo(() => {
    return statsForDays(allProjectStats, sort.days || defaultPreviousDays)
  }, [allProjectStats, sort.days])

  const projects = useMemo(() => {
    return allMarkdownRemark
      .filter(({ parent: { dir } }) => dir.endsWith('projects'))
      .map(({ frontmatter, parent }) => {
        const id = parent.name
        const stats = getProjectStats(allCurrentStats, id) || {}
        const previousStats = getProjectStats(allPreviousStats, id) || {}
        return {
          ...frontmatter,
          id,
          stats,
          previousStats,
          previousStatsAgeInDays: sort.days || defaultPreviousDays,
        }
      })
  }, [allMarkdownRemark, allCurrentStats, allPreviousStats, sort.days])

  const filteredProjects = useMemo(() => {
    if (isEmpty(filter)) {
      return projects
    }
    return projects.filter(project =>
      Object.entries(filter).every(([field, value]) => {
        return !value || project[field].includes(value)
      })
    )
  }, [projects, filter])

  const sortedProjects = useMemo(() => {
    let count = 0
    return filteredProjects.sort((aObj, bObj) => {
      const aCurrent = aObj.stats[sort.field]
      const bCurrent = bObj.stats[sort.field]
      const a = sort.days ? aCurrent - (aObj.previousStats || {})[sort.field] || 0 : aCurrent
      const b = sort.days ? bCurrent - (bObj.previousStats || {})[sort.field] || 0 : bCurrent
      const types = ['number', 'string']
      if (a && !b) return -1
      if (!a && b) return 1
      if (a && b) return compare(a, b, sort.reverse)
      return compare(aObj.stats[siteMeta.fallbackSortField], bObj.stats[siteMeta.fallbackSortField])
    })
  }, [filteredProjects, sort])

  const filters = useMemo(() => {
    return siteMeta.filters.map(filter => ({
      ...filter,
      values: sortBy(uniq(flatMap(projects, filter.field))),
    }))
  }, [projects, siteMeta.filters])

  const promoText = useMemo(() => {
    return allSiteMetadataMarkdownRemark.find(({ name }) => name === 'promo').html
  }, [allSiteMetadataMarkdownRemark])

  const renderProjects = () => {
    const list = sortedProjects.map(project => (
      <li key={project.id}>
        <ProjectCard fields={siteMeta.fields} {...project} />
      </li>
    ))
    list.splice(3, 0, <PromoCard key="promo" dangerouslySetInnerHTML={{ __html: promoText }} />)
    return list
  }

  return (
    <Layout>
      <SEO />
      <ControlBar
        currentFilter={filter}
        currentSort={sort}
        filters={filters}
        sorts={siteMeta.sorts}
        onChangeFilter={handleFilterChange}
        onChangeSort={handleSortChange}
      />
      <ProjectsList>{renderProjects()}</ProjectsList>
    </Layout>
  )
}

export const query = graphql`
  query ProjectsQuery {
    site {
      siteMetadata {
        fields {
          name
          label
        }
        filters {
          field
          emptyLabel
          multiple
        }
        sorts {
          field
          label
          reverse
          days
        }
        fallbackSortField
      }
    }
    allProjectStats {
      nodes {
        days
        projects {
          id
          followers
          forks
          issues
          stars
        }
      }
    }
    allMarkdownRemark {
      nodes {
        frontmatter {
          description
          homepage
          language
          license
          repohost
          startertemplaterepo
          repo
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
    allSiteMetadataMarkdownRemark {
      nodes {
        name
        html
      }
    }
  }
`

export default IndexPage
