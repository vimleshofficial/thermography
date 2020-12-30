import React from 'react'
import chroma from 'chroma-js'
import Scale from './Scale'
import Temperature from './Temperature'
import { ColorScalewrap } from '../StyledComponents'

const ColorScales = ({ minmax, colorRange, scaleheight }) => {
  const LENGTH = scaleheight

  const getColorsAndValues = (colorRange, length) => {
    const colorAndValues = []
    const scale = chroma.scale(colorRange).domain(minmax)
    for (let i = minmax[0]; i <= minmax[1]; i = i + (minmax[1] - minmax[0]) / length) {
      const color = scale(Math.floor(i))
      const rgba = color._rgb
      colorAndValues.push({ color: `rgba(${rgba})`, value: i.toFixed(2) })
    }
    return colorAndValues
  }

  const colorAndValues = getColorsAndValues(colorRange, LENGTH)
  colorAndValues.reverse()

  return (
    <ColorScalewrap>
      <Scale colors={colorAndValues} />
      <Temperature
        min={minmax[0]}
        max={minmax[1]}
        values={colorAndValues}
        divisionLength={50}
        scaleHeight={scaleheight}
      />
    </ColorScalewrap>
  )
}

export default ColorScales
