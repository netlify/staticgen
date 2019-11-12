import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 10px;
  display: block;
  text-align: center;

  &:active,
  &:focus,
  &:hover {
    color: #00c7b7;
  }
`

const NavAnchor = NavLink.withComponent('a')

export { NavLink as default, NavAnchor }
