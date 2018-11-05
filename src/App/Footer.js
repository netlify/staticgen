import React from 'react'
import styled from 'styled-components'
import { SiteData } from 'react-static'

const FooterContainer = styled.div`
  background: #b6b6b6;
  margin: 48px 0 0;
  padding: 48px 48px 24px;
  color: #fff;
`

const FooterContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

const FooterContent = styled.h3`
  font-weight: 300;
  font-size: 28px;
  text-align: center;
  line-height: 1.4;

  a {
    color: currentColor;
    text-decoration: none;
    font-weight: normal;
  }
`

const Copyright = styled.div`
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  margin-top: 48px;
`

const Footer = () => (
  <SiteData render={({ footerText, copyrightName }) => (
    <FooterContainer>
      <FooterContentContainer>
        <FooterContent dangerouslySetInnerHTML={{ __html: footerText }} />
      </FooterContentContainer>
      <Copyright>© {copyrightName} {new Date().getFullYear()}</Copyright>
    </FooterContainer>
  )} />)

export default Footer
