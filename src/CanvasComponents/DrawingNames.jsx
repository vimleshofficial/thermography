import React from 'react'
import { DrawingName } from '../StyledComponents'

const DrawingNames = ({ lines, points, rectangles }) => {
  if (
    Object.entries(lines).length === 0 &&
    Object.entries(points).length === 0 &&
    Object.entries(rectangles).length === 0
  ) {
    return <></>
  }

  const lineList = lines.map(item => {
    return (
      <DrawingName key={item.key} left={item.x - 25} top={item.y - 25}>
        {item.key}
      </DrawingName>
    )
  })
  const pointList = points.map(item => {
    return (
      <DrawingName key={item.key} left={item.x - 25} top={item.y - 25}>
        {item.key}
      </DrawingName>
    )
  })
  const rectangleList = rectangles.map(item => {
    return (
      <DrawingName key={item.key} left={item.x - 25} top={item.y - 25}>
        {item.key}
      </DrawingName>
    )
  })
  return [lineList, pointList, rectangleList]
}

export default DrawingNames
