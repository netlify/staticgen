import React from 'react'
import styled from '@emotion/styled'

const BannerContainer = styled.div`
  background-color: #000;
  color: #fff;
  display: block;
  text-align: center;
  z-index: 200;
  margin: 0;
  padding: 0;
  width: 100%;
  p {
    margin: 0;
    padding-top: 0.6em;
    padding-bottom: 0.6em;
  }
  a {
    color: #00c7b7;
  }

`

const Banner = ({ children }) => (
  <BannerContainer>
    <p>{children}</p>
  </BannerContainer>
)

export default Banner
