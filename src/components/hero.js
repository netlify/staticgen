import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import GitHubCorner from 'react-github-corner'
import ShareButton from "./ShareButton"

const LogoText = styled.span`
  font-size: 76px;
  font-family: "Roboto Slab", sans-serif;
`

const LogoLink = styled(Link)`
  &,
  &:link,
  &:active,
  &:hover {
    color: #fff;
    text-decoration: none;
  }
`

const HeroContainer = styled.div`
  background: linear-gradient(45deg, #4d9abf, #00c7b7);
  text-align: center;
  padding: 29px 0;
`

const HeroHeading = styled.h1`
  margin: 31px 0 0;

  img {
    height: auto;
    width: 400px;
    max-width: 80%;
    margin: 0 auto;
  }
`
const HeroSubheading = styled.h2`
  margin: 0 auto 40px;
  color: #313d3e;
  max-width: 660px;
  line-height: 1.5;
  font-weight: 100;
  font-size: 24px;
`

const ShareButtonGroup = styled.div`
  display: flex;
  justify-content: center;

  > * {
    margin: 0 4px;
  }
`

const Hero = ({ siteTitle }) => (
  <HeroContainer>
    <HeroHeading>
      <LogoLink to="/" title={siteTitle}>
        <LogoText>{siteTitle}</LogoText>
      </LogoLink>
    </HeroHeading>
    <HeroSubheading>A List of Static Site Generators for JAMstack Sites</HeroSubheading>

    <ShareButtonGroup>
      {['twitter', 'reddit'].map(type => (
        <ShareButton key={type} type={type} />
      ))}
    </ShareButtonGroup>

    <GitHubCorner
      href="https://github.com/netlify/staticgen"
      bannerColor="#313d3e"
      size="100"
      svgStyle={{ zIndex: 300 }}
    />
  </HeroContainer>
)

Hero.propTypes = {
  siteTitle: PropTypes.string,
}

Hero.defaultProps = {
  siteTitle: ``,
}

export default Hero
