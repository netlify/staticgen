import React from 'react'
import { SiteData } from 'react-static'
import styled from 'styled-components'
import Hero from './Hero'
import Nav from './Nav'
import NavLink, { NavAnchor } from './NavLink'


const JamstackConfBanner = ({ className }) => (
  <div className={className}>
    <p>
      Learn more about the JAMstack at{' '}
      <a href="https://jamstackconf.com/london">JAMstack Conf</a> in London — 9-10 July, 2019
    </p>
  </div>
)
const JamstackConfBannerStyled = styled(JamstackConfBanner)`
  background-color: #000;
  color: #fff;
  display: block;
  text-align: center;
  z-index: 200;
  position: fixed;
  margin: 0;
  padding: 0;
  width: 100%;
  p {
    margin: 0;
    padding-top: 0.6em;
    padding-bottom: 0.6em;
  }
  a:visited {
    color: #00c7b7;
  }

`

const Header = () => (
  <SiteData
    render={({
 title, subtitle, shareButtons, repo, pages, navLinks,
}) => (
  <div>
    <JamstackConfBannerStyled />
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
