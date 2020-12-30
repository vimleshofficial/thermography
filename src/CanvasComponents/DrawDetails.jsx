import React from 'react'
import { DetailBox, BlockSpan, ColorBlock } from '../StyledComponents'

const DrawDetails = ({ data }) => {
  if (JSON.stringify(data) === JSON.stringify({})) {
    return <></>
  }
  return (
    <DetailBox active={data.active} id="detailarea" left={data.left} top={data.top}>
      <BlockSpan> X:{data.x}</BlockSpan>
      <ColorBlock background={`rgba(${data.color})`}></ColorBlock>
      <BlockSpan> Y:{data.y}</BlockSpan>
      <BlockSpan>
        Color Code:{data.color.map(item => Math.round(item).toString()).join(',')}
      </BlockSpan>
      <BlockSpan> Heat Value: {data.heat}</BlockSpan>
    </DetailBox>
  )
}

export default DrawDetails
