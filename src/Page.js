import React from 'react'
import { SiteData, RouteData, Head } from 'react-static'
import { Container } from 'Components'

const Page = () =>
  <RouteData render={({ title, content }) =>
    <React.Fragment>
      <SiteData render={({ title: siteTitle }) =>
        <Head>
          <title>{`${title} | ${siteTitle}`}</title>
        </Head>
      }/>
      <Container dangerouslySetInnerHTML={{ __html: content }}/>
    </React.Fragment>
  }/>

export default Page
