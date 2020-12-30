import styled from 'styled-components'

const Sider = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.side === 'right' ? 0 : 'unset')};
  left: ${props => (props.side === 'left' ? 0 : 'unset')};
  padding: 0px 10px 0 0px;
  background: #282c34;
  bottom: 0;
  border-left: ${props => (props.side === 'right' ? '1px' : 0)} solid #5d5c5c;
  border-right: ${props => (props.side === 'left' ? '1px' : 0)} solid #5d5c5c;
  max-width: ${props => (props.side === 'right' ? '325px' : 'unset')};
  z-index: 99;
`
const FileLists = styled.div`
  float: left;
  margin-top: 20px;
  max-width: 200px;
`
const FileButton = styled.input`
  background: #222;
  color: #ddd;
  border: 1px solid;
  margin-bottom: 7px;
  font-size: 11px;
  cursor: pointer;
  width: 100%;
`
const Tool = styled.div`
  height: -webkit-fill-available;
  min-width: 45px;
  float: left;
  border-left: 1px solid #656565;
  z-index: 9999;
  margin-left: 10px;
  text-align: center;
`
const Shap = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 20px;
  margin-top: 24px;
  display: inline-block;
`
const ShapPoint = styled.span`
  height: 21px;
  width: 22px;
  margin: auto;
  display: inline-block;
  margin-top: 10px;
  background: transparent;
  border: 1px solid #bd8223;
  cursor: pointer;
  padding: 0px 0 0 1px;
  &.active {
    box-shadow: 0 0 2px 2px #fff;
  }
  & i {
    height: 5px;
    width: 5px;
    display: block;
    margin: 7px 6px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    pointer-events: none;
  }
`
const ShapLine = styled.span`
  height: 21px;
  width: 22px;
  margin: auto;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 15px;
  background: transparent;
  border: 1px solid #bd8223;
  cursor: pointer;
  &.active {
    box-shadow: 0 0 2px 2px #fff;
  }
  & i {
    border: 0;
    height: unset;
    margin-bottom: 0;
    position: relative;
    pointer-events: none;
    margin-top: -2px;
    width: 100%;
    display: block;
    margin-left: 1px;
    transform: rotate(137deg);
  }
`
const ShapRectangle = styled.span`
  margin: auto;
  padding: 1px;
  border: 1px solid #bd8223;
  height: 21px;
  width: 21px;
  display: block;
  background: #bd8223;
  cursor: pointer;
  &.active {
    box-shadow: 0 0 2px 2px #fff;
  }
  & i {
    pointer-events: none;
    width: 100%;
    height: unset;
    display: block;
    margin-top: -3px;
    margin-left: -3px;
  }
`
const ShapReset = styled.span`
  cursor: pointer;
  font-size: 10px;
  display: inline-block;
  margin: 13px 0 0 -3px;
`
const CanvasWrap = styled.div`
  margin-top: 80px;
  position: relative;
  margin-right: 150px;
`
const DrawingName = styled.span`
  z-index: 9;
  position: absolute;
  background: #fff;
  color: #222;
  font-size: 12px;
  padding: 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
`
const DetailBox = styled.div`
  position: fixed;
  text-align: left;
  margin: 0 10px 0 25px;
  padding: 5px;
  background: #000;
  border: 1px solid;
  border-radius: 10px;
  z-index: 999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  display: ${props => (props.active ? 'inline-block' : 'none')};
`
const BlockSpan = styled.span`
  display: block;
  font-size: 15px;
`
const ColorBlock = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background: ${props => props.background};
  height: 20px;
  width: 20px;
  border: 1px solid #fff;
  border-radius: 3px;
`
const Scalewrap = styled.div`
  position: absolute;
  top: -80px;
  left: 0px;
`
const ColorScalewrap = styled.div`
  font-family: sans-serif;
  text-align: center;
  position: absolute;
  right: -110px;
  top: 0px;
  width: fit-content;
`
const ColorScaleBlock = styled.div`
  cursor: pointer;
`
const ColorLine = styled.span`
  background-color: ${props => props.background};
  width: 30px;
  height: 1px;
  display: block;
`
const TemperatureWrap = styled.div`
  position: absolute;
  right: 33px;
  border-right: 1px solid #fff;
  padding-right: 20px;
  top: -1px;
`
const TemperaturValue = styled.i`
  & {
    display: block;
    height: 1px;
    font-size: ${props => (props.active ? '12px' : 'unset')};
    margin-top: ${props => (props.active ? '-8px' : 'unset')};
    margin-bottom: ${props => (props.active ? '8px' : 'unset')};
    position: ${props => (props.active ? 'relative' : 'unset')};
  }
  &:after {
    content: '';
    border-top: ${props => (props.active ? '1px solid #fff' : '0')};
    margin: 0 0 0 0;
    border-right: 31px solid transparent;
    position: absolute;
    top: 8px;
  }
`
const ToggleButton = styled.div`
  padding: 10px;
  border: 1px solid #dfe8f3;
  margin: 5px;
  font-size: 12px;
  width: 200px;
  border-radius: 4px;
  cursor: pointer;
`
const BoxColor = styled.i`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  border: 1px solid #fff;
  background: ${props => props.background};
`
const TableWrap = styled.div`
  display: block;
  & .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 9px 2px !important;
    border-color: #808080 !important;
    color: #ddd;
  }

  & .ant-table-thead > tr > th {
    color: rgb(255, 255, 255) !important;
    background: #4a4a4a !important;
  }
  & .ant-table table tr:hover td {
    color: #222;
  }
`
export {
  Sider,
  FileLists,
  FileButton,
  Tool,
  Shap,
  ShapPoint,
  ShapLine,
  ShapRectangle,
  ShapReset,
  CanvasWrap,
  DrawingName,
  DetailBox,
  BlockSpan,
  ColorBlock,
  Scalewrap,
  ColorScalewrap,
  ColorScaleBlock,
  ColorLine,
  TemperatureWrap,
  TemperaturValue,
  ToggleButton,
  BoxColor,
  TableWrap,
}
