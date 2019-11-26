import React from 'react'
import styled from '@emotion/styled'

const OpenSourceStatIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
`

const OpenSourceStatChange = styled.div`
  color: ${props => (props.increased && '#31bb47') || (props.decreased && '#c91b1b')};
  font-size: 14px;
`

const Stat = styled(({ Icon, value, change, indicateColor, label, dataAgeInDays, className }) => {
  const disabled = typeof value !== 'number'
  const changeValue = parseFloat(change, 10) > 0 ? `+${change}` : change

  return (
    <div title={label} className={`${className} ${disabled ? 'disabled' : ''}`}>
      <OpenSourceStatIcon>
        <Icon />
      </OpenSourceStatIcon>
      {disabled ? (
        <div>N/A</div>
      ) : (
        <div>
          <strong>{value}</strong>
          {dataAgeInDays >= 1 && (
            <OpenSourceStatChange
              title={`${label} in the last ${dataAgeInDays} day${dataAgeInDays === 1 ? '' : 's'}`}
              increased={indicateColor && change > 0}
              decreased={indicateColor && change < 0}
            >
              {changeValue === 0 ? '--' : changeValue}
            </OpenSourceStatChange>
          )}
        </div>
      )}
    </div>
  )
})`
  font-size: 15px;
  text-align: center;
  color: #313d3e;
  width: 25%;

  & svg {
    fill: #313d3e !important;
  }

  &.disabled {
    color: #bbb;

    & svg {
      fill: #bbb !important;
    }
  }
`

export default Stat
