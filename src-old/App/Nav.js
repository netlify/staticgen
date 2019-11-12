import React from 'react'
import styled from 'styled-components'
import { Container } from 'Components'

const NavBar = styled.div`
  background: #313d3e;
`

const NavMenu = Container.extend`
  margin: 0 auto;
  padding-top: 0;
  padding-bottom: 0;

  @media (min-width: 600px) {
    display: flex;
  }
`

const Nav = ({ children }) => (
  <NavBar>
    <NavMenu>
      {children}
    </NavMenu>
  </NavBar>
)

export default Nav
