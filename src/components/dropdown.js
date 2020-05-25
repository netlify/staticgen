import React from 'react'
import styled from '@emotion/styled'

/**
 * Dropdown design credit: http://codepen.io/Thibaut/pen/Jasci
 */

const DropdownContainer = styled.div`
  display: block;
  width: 100%;
  height: 48px;
  position: relative;
  overflow: hidden;
  background: #f2f2f2;
  border: 1px solid;
  border-color: white #f7f7f7 whitesmoke;
  border-radius: 3px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    z-index: 2;
    top: 9px;
    right: 10px;
    width: 0;
    height: 0;
    border: 4px dashed;
    border-color: #888888 transparent;
    pointer-events: none;

    @media (max-width: 600px) {
      top: 19px;
    }
  }

  &:before {
    border-bottom-style: solid;
    border-top: none;
  }

  &:after {
    margin-top: 7px;
    border-top-style: solid;
    border-bottom: none;
  }

  @media (min-width: 600px) {
    display: inline-block;
    height: 32px;
    width: 150px;
  }

  /* Dirty fix for Firefox adding padding where it shouldn't. */

  @-moz-document url-prefix() {
    select {
      padding-left: 6px;
    }
  }
`

const DropdownSelect = styled.select`
  font-size: 16px;
  height: 48px;
  line-height: 2;
  position: relative;
  width: 130%;
  margin: 0;
  padding: 8px 8px 8px 10px;
  color: #62717a;
  background: transparent;
  border: 0;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* Fix select appearance on Firefox https://gist.github.com/joaocunha/6273016/ */
  text-indent: 0.01px;
  text-overflow: '';

  &:focus {
    z-index: 3;
    width: 100%;
    color: #394349;
    outline: none;
  }

  @media (min-width: 600px) {
    font-size: 14px;
    height: 32px;
    line-height: 1.2;
  }
`

const DropdownOption = styled.option`
  margin: 3px;
  padding: 6px 8px;
  text-shadow: none;
  background: #f2f2f2;
  border-radius: 3px;
  cursor: pointer;
`

const Dropdown = ({ emptyLabel, options, selection, onChange, field }) => (
  <DropdownContainer>
    <DropdownSelect value={selection} onChange={onChange}>
      {emptyLabel && <DropdownOption value="">{emptyLabel}</DropdownOption>}
      {options.map(option => (
        <DropdownOption key={`${field ? `${field}_` : ''}${option.value}`} value={option.value}>
          {option.label}
        </DropdownOption>
      ))}
    </DropdownSelect>
  </DropdownContainer>
)

export default Dropdown
