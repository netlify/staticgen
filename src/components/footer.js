import React from 'react'
import styled from '@emotion/styled'

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
  font-weight: 200;
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
  font-weight: 200;
  text-align: center;
  margin-top: 48px;
`

const Footer = ({ footerHtml, copyrightName }) => (
  <FooterContainer>
    <FooterContentContainer>
      <FooterContent dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </FooterContentContainer>
    <Copyright>© {copyrightName} {new Date().getFullYear()}</Copyright>
  </FooterContainer>
)

export default Footer
