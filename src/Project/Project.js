import React from 'react'
import { RouteData } from 'react-static'
import styled from 'styled-components'
import { EntypoHome, EntypoTwitter, EntypoGithub } from 'react-entypo'
import Prism from 'prismjs/components/prism-core'
import prismLoadLanguages from 'prismjs/components/index'
import 'prismjs/themes/prism-okaidia.css'

prismLoadLanguages(['json', 'bash'])

const EntypoIcon = styled(({ Icon, className }) =>
  <Icon className={className}/>
)`
  position: relative;
  top: 1px;
`

const DetailLink = styled.div`
  display: inline-block;
  white-space: nowrap;
  margin-right: 18px;
`

const SiteGenerators = styled.div`
  margin: 20px 0 28px;

  .title {
    font-weight: 700;
    margin-right: 12px;
  }
`

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.contentContainer = React.createRef()
  }

  componentDidMount() {
    Prism.highlightAllUnder(this.contentContainer.current)
  }

  render() {
    return (
      <RouteData render={({
        title,
        repo,
        homepage,
        languages,
        stars,
        followers,
        twitter,
        content,
      }) =>
        <div className="main">
          <div className="sheet">
            <h1>{title}</h1>

            <div className="links">
              <DetailLink>
                <a href={homepage}><EntypoIcon Icon={EntypoHome}/> {homepage}</a>
              </DetailLink>
              {!twitter ? null :
                <DetailLink>
                  <a href={`https://twitter.com/${twitter}`}><EntypoIcon Icon={EntypoTwitter}/> {twitter} ({followers})</a>
                </DetailLink>
              }
              {!repo ? null :
                <DetailLink>
                  <a href={`https://github.com/${repo}`}><EntypoIcon Icon={EntypoGithub}/> https://github.com/{repo} ({stars})</a>
                </DetailLink>
              }
            </div>

            <SiteGenerators>
              <span className="title">Languages:</span>
              <span>{languages.join(', ')}</span>
            </SiteGenerators>

            <div className="text">
              <div dangerouslySetInnerHTML={{ __html: content }} ref={this.contentContainer}></div>
            </div>

          </div>
        </div>
      }/>
    )
  }
}

export default Project
