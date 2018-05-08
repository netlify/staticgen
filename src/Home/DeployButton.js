import React from 'react'
import styled from 'styled-components'
import netlifyLogo from 'Images/netlify-logo.svg'

const DeployButton = styled(({ repo, className }) =>
  <a
    className={className}
    href={`https://app.netlify.com/start/deploy?repository=https://github.com/${repo}`}
  >
    <img src={netlifyLogo}/> Deploy to Netlify
  </a>
)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fcfcfc;
  border-top: 1px solid #eee;
  margin: 20px -18px -18px;
  border-radius: 0 0 8px 8px;
  color: #374344 !important;
  font-size: 17px;
  padding: 11px;

  &, &:link, &:active, &:hover {
    color: #313d3e;
    text-decoration: none;
  }

  img {
    width: 28px;
    margin-right: 8px;
  }
`

export default DeployButton
