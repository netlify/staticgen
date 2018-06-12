import React from 'react'
import styled from 'styled-components'
import prettyBytes from 'pretty-bytes'

const OpenSourceStatIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
`

const OpenSourceStatChange = styled.div.attrs({ title: props => props.title })`
  ${props => props.indicateColor && parseFloat(props.children, 10) > 0 && 'color: #31bb47;'}
  ${props => props.indicateColor && parseFloat(props.children, 10) < 0 && 'color: #c91b1b;'}
  font-size: 14px;
`

const OpenSourceStat = styled(({
  Icon,
  value,
  change,
  indicateColor,
  label,
  dataAgeInDays,
  className,
  isBytes,
}) => {
  const disabled = typeof value !== 'number'
  const changeValue = parseFloat(change, 10) > 0 ? `+${change}` : change
  let valClass = '';
  if (isBytes && !disabled) {
    value = prettyBytes(value)
    valClass = 'small'
  }

  return (
    <div title={label} className={`${className} ${disabled ? 'disabled' : ''}`}>
      <OpenSourceStatIcon>
        <Icon/>
      </OpenSourceStatIcon>
      {disabled ? <div>N/A</div> :
        <div>
          <strong className={valClass}>{value}</strong>
          {dataAgeInDays < 1 ? null :
            <OpenSourceStatChange
              title={`${label} in the last ${dataAgeInDays} days`}
              indicateColor={indicateColor}
            >
              {changeValue === 0 ? '--' : changeValue}
            </OpenSourceStatChange>
          }
        </div>
      }
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

  .small {
    font-size: 12px;
  }
`

export default OpenSourceStat
