import React from 'react'
import { Icon } from 'antd'
import { Tool, Shap, ShapLine, ShapPoint, ShapRectangle, ShapReset } from '../StyledComponents'

const ToolBar = ({ resetAll, drawingActive }) => {
  return (
    <Tool>
      <Shap className="shap">
        <ShapPoint className="navset" name="Circle" title="Point" onClick={drawingActive}>
          <Icon type="point" />
        </ShapPoint>
        <ShapLine className="navset" name="Line" title="Line" onClick={drawingActive}>
          <Icon type="line" />
        </ShapLine>
        <ShapRectangle
          className="navset"
          name="Rectangle"
          title="Rectangle"
          onClick={drawingActive}
        >
          <Icon type="border-outer" />
        </ShapRectangle>
        <ShapReset onClick={resetAll}>Reset</ShapReset>
      </Shap>
    </Tool>
  )
}
export default ToolBar
