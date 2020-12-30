import React from 'react'
import { TemperatureWrap, TemperaturValue } from '../StyledComponents'

const Temperature = ({ min, max, values, divisionLength, scaleHeight }) => {
  return (
    <TemperatureWrap>
      <TemperaturValue active={true}>{max.toFixed(1)}</TemperaturValue>
      {values.map((item, key) => (
        <TemperaturValue
          active={
            key % divisionLength === 0 && key > 0 && key + divisionLength < scaleHeight
              ? true
              : false
          }
          key={key}
        >
          {key % divisionLength === 0 && key > 0 && key + divisionLength < scaleHeight
            ? (item.value * 1).toFixed(1)
            : ''}
        </TemperaturValue>
      ))}
      <TemperaturValue active={true}>{min.toFixed(1)}</TemperaturValue>
    </TemperatureWrap>
  )
}

export default Temperature
