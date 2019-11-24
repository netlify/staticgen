import React from 'react'
import styled from '@emotion/styled'
import { EntypoHome, EntypoTwitter, EntypoGithub } from 'react-entypo'
import Layout from '../components/layout'

const EntypoIcon = styled(({ Icon, className }) =>
  <Icon className={className} />
)`
  position: relative;
  top: 1px;
`

const DetailLink = styled.a`
  display: inline-block;
  white-space: nowrap;
  margin-right: 18px;

  &, &:visited {
    color: #666;
  }

  &:link, &:active, &:hover {
    color: #222;
    text-decoration: none;
  }
`

const FieldsContainer = styled.div`
  display: flex;
  margin-top: 20px;

  .title {
    font-weight: 700;
    margin-right: 8px;
  }
`

const Field = styled.div`
  margin-right: 18px;

  span:first-child {
    font-weight: 700;
    margin-right: 8px;
  }
`

const Content = styled.div`
  a {
    &, &:link, &:active, &:hover {
      color: #00c7b7;
      text-decoration: none;
    }
  }
`

const Project = ({ pageContext }) => {
  const {
    title,
    repo,
    repohost,
    homepage,
    stars,
    followers,
    twitter,
    content,
    fields,
  } = pageContext

  return (
    <Layout>
      <h1>{title}</h1>
      <div>
        <DetailLink href={homepage}><EntypoIcon Icon={EntypoHome} /> {homepage}</DetailLink>
        {twitter &&
          <DetailLink href={`https://twitter.com/${twitter}`}>
            <EntypoIcon Icon={EntypoTwitter} /> {twitter} ({followers})
          </DetailLink>
        }
        {repo &&
          <DetailLink href={`https://${repohost || 'github'}.com/${repo}`}>
            <EntypoIcon Icon={EntypoGithub} /> {repo} ({stars})
          </DetailLink>
        }
      </div>

      <FieldsContainer>
        {fields.map(({ name, label }) => {
          const value = pageContext[name]
          return (
            <Field key={name}>
              <span>{label}:</span>
              <span>{Array.isArray(value) ? value.join(', ') : value}</span>
            </Field>
          )
        })}
      </FieldsContainer>

      <Content>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Content>
    </Layout>
  )
}

export default Project
