import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-static'
import DeployButton from './DeployButton'
import DataPoint from './DataPoint'

const CardContainer = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  color: #313D3E;
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

  &, &:link, &:active, &:hover {
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
  font-size: ${props => props.small ? '24px' : '30px'};
  padding: ${props => props.small ? '7px 18px 10px' : '0 18px 6px'};
`

const Description = styled.p`
  margin-top: 16px;
  margin-bottom: 10px;
  hyphens: auto;
`

const OpenSourceStats = styled.div`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background: #fcfcfc;
  padding: 18px;
  margin: 16px -18px 0;
  display: flex;
  justify-content: center;
`

const Card = ({
  url, title, description, starterTemplateRepo, Stats, fields, fieldValues,
}) => (
  <CardContainer>
    <CardBodyLink to={url}>
      <Title small={title && title.length > 14}>{title}</Title>
      <OpenSourceStats>
        <Stats />
      </OpenSourceStats>
      <Description>{description}</Description>
      {fields.map(field =>
        <DataPoint key={field.name} value={fieldValues[field.name]} field={field} />
      )}
    </CardBodyLink>
    { starterTemplateRepo ? <DeployButton repo={starterTemplateRepo} /> : null }
  </CardContainer>
)

export default Card
