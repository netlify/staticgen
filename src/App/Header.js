import React from 'react'
import { SiteData } from 'react-static'
import styled from 'styled-components'
import Hero from './Hero'
import Nav from './Nav'
import NavLink, { NavAnchor } from './NavLink'

const Header = () => (
  <SiteData
    render={({
 title, subtitle, shareButtons, repo, pages, navLinks,
}) => (
  <div>
    <Hero
      title={title}
      subheading={subtitle}
      shareButtons={shareButtons}
      repoLink={repo}
        />
    <Nav>
      {pages.map(({ path, name }) => (
        <NavLink key={path} to={path}>
          {name}
        </NavLink>
          ))}
      {navLinks.map(({ url, text }) => (
        <NavAnchor key={url} href={url} target="_blank">
          {text}
        </NavAnchor>
          ))}
    </Nav>
  </div>
    )}
  />
)

export default Header
