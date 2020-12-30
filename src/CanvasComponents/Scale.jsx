import React from 'react'
import { ColorScaleBlock, ColorLine } from '../StyledComponents'

const Scale = ({ colors }) => {
  return (
    <ColorScaleBlock>
      {colors.map((item, key) => (
        <ColorLine key={key} title={item.value} background={item.color} />
      ))}
    </ColorScaleBlock>
  )
}

export default Scale
