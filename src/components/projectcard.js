import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Octicon from 'react-component-octicons'
import { EntypoTwitter } from 'react-entypo'
import Stat from './stat'
import DeployButton from './deploybutton'
import DataPoint from './datapoint'

const TwitterIcon = styled(EntypoTwitter)`
  width: 16px !important;
  height: 16px !important;
`

const CardContainer = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  color: #313d3e;
  display: block;
  font-size: 14px;
  padding: 18px;
  text-decoration: none;

  ul {
    padding: 10px 0 8px 20px;
  }

  .type {
    display: inline;
  }
`

const CardBodyLink = styled(Link)`
  display: block;
  margin: -18px;
  padding: 18px;

  &,
  &:link,
  &:active,
  &:hover {
    color: #313d3e;
    text-decoration: none;
  }
`

const Title = styled.h4`
  margin: 0 -18px 0px;
  font-weight: normal;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${props => (props.small ? '24px' : '30px')};
  padding: ${props => (props.small ? '7px 18px 10px' : '0 18px 6px')};
`

const Description = styled.p`
  margin-top: 16px;
  margin-bottom: 10px;
  hyphens: auto;
`

const StatsContainer = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background: #fcfcfc;
  padding: 18px;
  margin: 16px -18px 0;
  display: flex;
  justify-content: center;
`

const Card = props => {
  const {
    id,
    title,
    description,
    startertemplaterepo,
    fields,
    stats: { stars, issues, forks, followers } = {},
    previousStats: {
      stars: starsPrevious,
      issues: issuesPrevious,
      forks: forksPrevious,
      followers: followersPrevious,
    } = {},
    previousStatsAgeInDays,
  } = props

  return (
    <CardContainer>
      <CardBodyLink to={`/${id}`}>
        <Title small={title && title.length > 14}>{title}</Title>
        <StatsContainer>
          <Stat
            key="stars"
            Icon={() => <Octicon name="star" zoom="100%" />}
            label="Repo stars"
            value={stars}
            change={stars - starsPrevious || 0}
            indicateColor
            dataAgeInDays={previousStatsAgeInDays}
          />
          <Stat
            key="issues"
            Icon={() => <Octicon name="issue-opened" zoom="100%" />}
            label="Open issues"
            value={issues}
            change={issues - issuesPrevious || 0}
            dataAgeInDays={previousStatsAgeInDays}
          />
          <Stat
            key="forks"
            Icon={() => <Octicon name="repo-forked" zoom="100%" />}
            label="Repo forks"
            value={forks}
            change={forks - forksPrevious || 0}
            indicateColor
            dataAgeInDays={previousStatsAgeInDays}
          />
          <Stat
            key="followers"
            Icon={() => <TwitterIcon />}
            label="Twitter followers"
            value={followers}
            change={followers - followersPrevious || 0}
            indicateColor
            dataAgeInDays={previousStatsAgeInDays}
          />
        </StatsContainer>
        <Description>{description}</Description>
        {fields.map(field => (
          <DataPoint key={field.name} value={props[field.name]} label={field.label} />
        ))}
      </CardBodyLink>
      {startertemplaterepo && (
        <DeployButton repo={getStarterTemplateRepoUrl(startertemplaterepo)} />
      )}
    </CardContainer>
  )
}

function getStarterTemplateRepoUrl(repo, repoHost = 'github') {
  if (!repo) {
    return
  }
  switch (repoHost) {
    case 'github':
      return `https://github.com/${repo}`
    case 'gitlab':
      return `https://gitlab.com/${repo}`
  }
}

export default Card
