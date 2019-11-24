import React from 'react'
import styled from '@emotion/styled'
import Layout from '../components/layout'

const Content = styled.div`
  a {
    &, &:link, &:active, &:hover {
      color: #00c7b7;
      text-decoration: none;
    }
  }
`

const Page = ({ pageContext: { title, content } }) => (
  <Layout>
    <Content>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Content>
  </Layout>
)

export default Page
