import React from 'react'
import styled from '@emotion/styled'
import DropdownGroup from './dropdowngroup'
import Dropdown from './dropdown'

const DropdownRow = styled.div`
  @media (min-width: 800px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 36px;
  }

  > div {
    &:not(:first-child) {
      margin-top: 18px;

      @media (min-width: 800px) {
        margin-top: 0;
      }
    }
  }
`

const ControlBar = ({
  currentFilter,
  currentSort,
  filters,
  sorts,
  onChangeFilter,
  onChangeSort,
}) => (
  <DropdownRow>
    <DropdownGroup label="Filter">
      {filters.map(({ field, emptyLabel, values }) => (
        <Dropdown
          key={field}
          field={field}
          emptyLabel={emptyLabel}
          options={values.map(value => ({ value, label: value }))}
          selection={currentFilter[field]}
          onChange={onChangeFilter.bind(null, field)}
        />
      ))}
    </DropdownGroup>
    <DropdownGroup label="Sort">
      <Dropdown
        name="sort"
        options={sorts.map(({ label }, idx) => ({ value: idx, label }))}
        selection={currentSort.value}
        onChange={onChangeSort}
      />
    </DropdownGroup>
  </DropdownRow>
)

export default ControlBar
