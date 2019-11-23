/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Global, css } from "@emotion/core"
import styled from '@emotion/styled'
import Hero from "./hero"
import Nav from "./nav"
import NavLink, { NavAnchor } from './navlink'
import Banner from './banner'
import "typeface-roboto"


const globalStyles = css`
  * {
    box-sizing: border-box;
    text-size-adjust: none;
  }

  body {
    margin: 0;
    font-family: 'Roboto', 'sans-serif';
    font-size: 16px;
    line-height: 1.6;
    color: #444;
    background: #fbfbfb;
  }
`

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 40px;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Global styles={globalStyles}/>
      <Banner>
        Learn more about the JAMstack at{' '}
        <a href="https://jamstackconf.com/sf">JAMstack Conf</a>{' '}
        in San Francisco — 16-18 October, 2019
      </Banner>
      <Hero siteTitle={data.site.siteMetadata.title} />
      <Nav>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contribute">Contribute</NavLink>
        <NavAnchor href="https://jamstack.org" target="_blank" rel="noopener noreferrer">
          About JAMstack
        </NavAnchor>
        <NavAnchor href="https://headlesscms.org" target="_blank" rel="noopener noreferrer">
          Need a Static CMS?
        </NavAnchor>
      </Nav>
      <Container>
        {children}
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
