import styled from 'styled-components'
import React from 'react'
import { isLeapYear } from './isLeapYear'

export function Input(props) {
  const [inputValState, setInputValState] = React.useState('')

  return (
    <InputStyled
      type="number"
      placeholder="Year"
      value={inputValState}
      onChange={e => {
        const val = e.target.value
        setInputValState(val)
        props.setYearTypeState(isLeapYear(val))
      }}
    />
  )
}

const InputStyled = styled.input`
  padding: 10px;
  min-width: 200px;
  font-size: inherit;
`
