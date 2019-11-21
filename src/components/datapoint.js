import React from 'react'
import styled from '@emotion/styled'

const DataPointContainer = styled.div`
  margin-top: 8px;

  p {
    margin-top: 0;
  }
`

const DataPointTitle = styled.h6`
  display: inline;
  font-size: 14px;
  font-weight: 600;
  margin-right: 4px;
`

const DataPoint = ({ field, value }) => (
  <DataPointContainer>
    <DataPointTitle>{field.label}:</DataPointTitle>
    <p className="type">{Array.isArray(value) ? value.join(', ') : value}</p>
  </DataPointContainer>
)

export default DataPoint
