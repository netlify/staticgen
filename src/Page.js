import React from 'react'
import styled from 'styled-components'
import { SiteData, RouteData, Head } from 'react-static'
import { Container } from 'Components'

const Content = styled.div`
  a {
    &, &:link, &:active, &:hover {
      color: #00c7b7;
      text-decoration: none;
  }
`

const Page = () =>
  <RouteData render={({ title, content }) =>
    <React.Fragment>
      <SiteData render={({ title: siteTitle }) =>
        <Head>
          <title>{`${title} | ${siteTitle}`}</title>
        </Head>
      }/>
      <Content>
        <Container dangerouslySetInnerHTML={{ __html: content }}/>
      </Content>
    </React.Fragment>
  }/>

export default Page
