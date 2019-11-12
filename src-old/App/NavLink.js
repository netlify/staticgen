import styled from 'styled-components'
import { Link } from 'react-static'

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
