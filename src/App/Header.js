import React from 'react'
import { Link, RouteData, Head } from 'react-static'
import styled from 'styled-components'
import { TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon } from 'react-share'
import GitHubCorner from 'react-github-corner'

const ShareButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  > * {
    margin: 0 4px;
  }
`

const ShareButton = styled(({ type, url, color, className, text }) => {
  const components = {
    twitter: { Button: TwitterShareButton, Icon: TwitterIcon },
    reddit: { Button: RedditShareButton, Icon: RedditIcon },
  }
  const { Button, Icon } = components[type];

  return (
    <Button url={url} title={text} className={className}>
      <Icon size={40} round={true} iconBgStyle={{ fill: '#313d3e' }}/>
    </Button>
  )
})`
  cursor: pointer;

  &:hover {
    circle {
      transition: fill 0.1s ease;
      fill: ${({ color }) => color} !important;
    }
  }
`

const LogoText = styled.span`
  font-size: 76px;
  font-family: 'Roboto Slab', sans-serif;
`

const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`

const Header = () =>
  <RouteData render={({ title, shareUrl, shareText }) =>
    <div>
      <Head>
        <title>
          {`${title ? `${title} | StaticGen` : 'StaticGen | Top Open Source Static Site Generators'}`}
        </title>
      </Head>
      <div className="hero">
        <h1>
          <LogoLink to="/" title="StaticGen">
            <LogoText>StaticGen</LogoText>
          </LogoLink>
        </h1>
        <h2>A List of Static Site Generators for JAMstack Sites</h2>

        <ShareButtonWrapper>
          <ShareButton type="twitter" url={shareUrl} color="#1da1f2" text={shareText}/>
          <ShareButton type="reddit" url={shareUrl} color="#ff4500" text={shareText}/>
        </ShareButtonWrapper>

        <GitHubCorner
          href="https://github.com/netlify/staticgen"
          bannerColor="#313d3e"
          size="100"
        />
      </div>
      <div className="navbar">
        <div className="container">
          <div className="menu left">
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contribute">Contribute</Link></li>
              <li><a href="https://jamstack.org" target="_blank">About JAMstack</a></li>
              <li><a href="https://headlesscms.org" target="_blank">Need a Static CMS?</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  }/>

export default Header
