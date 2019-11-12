import React from 'react'
import styled from 'styled-components'

const DropdownGroupMembersContainer = styled.div`
  @media (min-width: 600px) {
    display: flex;
  }
`

const DropdownGroupLabel = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`

const DropdownGroupMember = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
  }

  @media (min-width: 600px) {
    &:not(:first-child) {
      margin-top: 0;
    }

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`

const DropdownGroup = ({ label, children }) => (
  <div>
    {label && <DropdownGroupLabel>{label}</DropdownGroupLabel>}
    <DropdownGroupMembersContainer>
      {React.Children.map(children, child => <DropdownGroupMember>{child}</DropdownGroupMember>)}
    </DropdownGroupMembersContainer>
  </div>
)

export default DropdownGroup
