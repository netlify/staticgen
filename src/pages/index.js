import React from "react"
import { graphql } from "gatsby"
import styled from '@emotion/styled'
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectCard from '../components/projectcard'

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

const IndexPage = ({ data }) => {
  const { allProjectStats, allMarkdownRemark, site } = data
  const projects = allMarkdownRemark.nodes.map(({ frontmatter, parent }) => {
    const stats = allProjectStats.nodes.find(({ slug }) => parent.name === slug)
    return { ...frontmatter, ...stats }
  })
  return (
    <Layout>
      <SEO title="Home"/>
      <ProjectsList>
        {projects.map(project => (
          <li key={project.slug}>
            <ProjectCard fields={site.siteMetadata.fields} {...project} />
          </li>
        ))}
      </ProjectsList>
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
      }
    }
    allProjectStats {
      nodes {
        id
        slug
        dataAgeInDays
        followers
        followersPrevious
        forks
        forksPrevious
        issues
        issuesPrevious
        stars
        starsPrevious
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
          }
        }
      }
    }
  }
`

export default IndexPage
