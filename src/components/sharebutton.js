import React from 'react'
import styled from '@emotion/styled'
import {
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share'

const buttonConfigs = {
  twitter: { Button: TwitterShareButton, Icon: TwitterIcon, color: '#1da1f2' },
  reddit: { Button: RedditShareButton, Icon: RedditIcon, color: '#ff4500' },
}

const Button = styled(({
  type, url, text, className,
}) => {
  const { Button, Icon } = buttonConfigs[type]
  return (
    <Button url={url} title={text} className={className}>
      <Icon size={40} round iconBgStyle={{ fill: '#313d3e' }} />
    </Button>
  )
})`
  cursor: pointer;

  &:hover {
    circle {
      transition: fill 0.1s ease;
      fill: ${({ type }) => buttonConfigs[type].color} !important;
    }
  }
`

const ShareButton = ({ type }) => (
  <Button type={type} url="https://example.com" text="demo share text" />
)

export default ShareButton
