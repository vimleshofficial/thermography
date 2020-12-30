import React, { useState } from 'react'
import ColorscalePicker, { Colorscale } from 'react-colorscales'
import { Scalewrap, ToggleButton } from '../StyledComponents'

const DEFAULT_SCALE = [
  '#000004',
  '#1b0c41',
  '#4a0c6b',
  '#781c6d',
  '#a52c60',
  '#cf4446',
  '#ed6925',
  '#fb9b06',
  '#f7d13d',
  '#fcffa4',
]

const ColorPicker = ({ colorRange, changeCanvasColorRange }) => {
  const [showColorscalePicker, setShowColorscalePicker] = useState(false)
  const [colorscale, setColorscale] = useState(DEFAULT_SCALE)

  const onChange = colors => {
    setColorscale(colors)
    setShowColorscalePicker(!showColorscalePicker)
    changeCanvasColorRange(colors)
  }

  const toggleColorscalePicker = () => {
    setShowColorscalePicker(!showColorscalePicker)
  }

  let toggleButtonStyle = {}
  if (showColorscalePicker) {
    toggleButtonStyle = { borderColor: '#A2B1C6' }
  }

  return (
    <Scalewrap>
      <ToggleButton onClick={toggleColorscalePicker} style={toggleButtonStyle}>
        <Colorscale colorscale={colorscale} onClick={() => {}} width={150} />
        Toggle Colorscale Picker
      </ToggleButton>
      {showColorscalePicker && (
        <ColorscalePicker
          onChange={onChange}
          colorscale={colorscale}
          nSwatches={colorscale.length}
        />
      )}
    </Scalewrap>
  )
}

export default ColorPicker
