/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import Hero from './hero'
import Nav from './nav'
import NavLink, { NavAnchor } from './navlink'
import Banner from './banner'
import Footer from './footer'
import 'typeface-roboto'
import 'typeface-roboto-slab'

const globalStyles = css`
  * {
    box-sizing: border-box;
    text-size-adjust: none;
  }

  body {
    margin: 0;
    font-family: 'Roboto', 'sans-serif';
    font-size: 16px;
    line-height: 1.4;
    color: #444;
    background: #fbfbfb;
  }
`

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 40px;
`

const Layout = ({ projectTitle, projectUrl, projectId, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          url
          title
          copyrightName
          shareText
          shareTextProjectStart
          shareTextProjectEnd
        }
      }
      allSiteMetadataMarkdownRemark {
        nodes {
          name
          html
        }
      }
    }
  `)

  const {
    url: siteUrl,
    shareText: defaultShareText,
    shareTextProjectStart,
    shareTextProjectEnd,
  } = data.site.siteMetadata
  const shareUrl = projectId ? `${siteUrl}/${projectId}` : siteUrl
  const shareText = projectId
    ? `${shareTextProjectStart}${projectTitle}${shareTextProjectEnd}`
    : defaultShareText
  const footerHtml = data.allSiteMetadataMarkdownRemark.nodes.find(({ name }) => {
    return name === 'footer'
  }).html

  return (
    <>
      <Global styles={globalStyles} />

      <Banner>
        Join us at the first Headless Commerce Summit, Sept 3rd. <a href="https://headlesscommercesummit.com/" target="_blank" rel="noopener noreferrer">Learn&nbsp;more</a>
      </Banner>

      <Hero siteTitle={data.site.siteMetadata.title} shareText={shareText} shareUrl={shareUrl} />
      <Nav>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contribute">Contribute</NavLink>
        <NavAnchor href="https://jamstack.org" target="_blank" rel="noopener noreferrer">
          About Jamstack
        </NavAnchor>
        <NavAnchor href="https://headlesscms.org" target="_blank" rel="noopener noreferrer">
          Need a Static CMS?
        </NavAnchor>
      </Nav>
      <Container>{children}</Container>
      <Footer footerHtml={footerHtml} copyrightName={data.site.siteMetadata.copyrightName} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
