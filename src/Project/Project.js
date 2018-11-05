import React from 'react'
import { SiteData, RouteData, Head } from 'react-static'
import styled from 'styled-components'
import { EntypoHome, EntypoTwitter, EntypoGithub } from 'react-entypo'
import Prism from 'prismjs/components/prism-core'
import prismLoadLanguages from 'prismjs/components/index'
import 'prismjs/themes/prism-tomorrow.css'
import { Container } from 'Components'

prismLoadLanguages(['json', 'bash', 'markdown', 'clojure', 'javascript', 'handlebars'])

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

class Project extends React.Component {
  constructor (props) {
    super(props)
    this.contentContainer = React.createRef()
  }

  componentDidMount () {
    Prism.highlightAllUnder(this.contentContainer.current)
  }

  render () {
    return (
      <RouteData render={({
        title,
        repo,
        homepage,
        fieldValues,
        stars,
        followers,
        twitter,
        content,
        fields,
      }) => (
        <Container>
          <SiteData render={({ title: siteTitle }) => (
            <Head>
              <title>{title} | {siteTitle}</title>
            </Head>
          )} />
          <h1>{title}</h1>
          <div>
            <DetailLink href={homepage}><EntypoIcon Icon={EntypoHome} /> {homepage}</DetailLink>
            {twitter &&
              <DetailLink href={`https://twitter.com/${twitter}`}>
                <EntypoIcon Icon={EntypoTwitter} /> {twitter} ({followers})
              </DetailLink>
            }
            {repo &&
              <DetailLink href={`https://github.com/${repo}`}>
                <EntypoIcon Icon={EntypoGithub} /> https://github.com/{repo} ({stars})
              </DetailLink>
            }
          </div>

          <FieldsContainer>
            {fields.map(({ name, label }) => {
              const value = fieldValues[name]
              return (
                <Field key={name}>
                  <span>{label}:</span>
                  <span>{Array.isArray(value) ? value.join(', ') : value}</span>
                </Field>
              )
            })}
          </FieldsContainer>

          <Content>
            <div dangerouslySetInnerHTML={{ __html: content }} ref={this.contentContainer} />
          </Content>
        </Container>
      )} />
    )
  }
}

export default Project
