import React from 'react'
import chroma from 'chroma-js'
import ColorScales from './CanvasComponents/ColorScales'
import ColorPicker from './CanvasComponents/ColorPicker'
import DrawDetails from './CanvasComponents/DrawDetails'
import DrawingNames from './CanvasComponents/DrawingNames'
import { CanvasWrap } from './StyledComponents'

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      trakMouse: 'start',
      startMousePointerX: 0,
      startMousePointerY: 0,
      endMousePointerX: 0,
      endMousePointerY: 0,
      rectangleNameCount: 0,
      lineNameCount: 0,
      pointNameCount: 0,
      lines: [],
      rectangles: [],
      points: [],
      imgData: null,
      colorCode: '',
      colorArray: [],
      canvasColors: [],
      hoverBox: {},
      colorRange: [
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
      ],
    }
  }
  componentDidMount() {
    // console.log(`${new Date().toISOString()} - componentDidMount`)
    this.updateCanvas()
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(`${new Date().toISOString()} - componentDidUpdate`)
    if (this.props.delKye.key !== '') this.deleteDrawing(this.props.delKye.key)
    if (prevProps.data !== this.props.data) {
      this.setState({ canvasColors: [], imgData: null })
      this.resetCanvasData()
      this.updateCanvas()
    }
    if (this.props.resetdata.reset === 'reset') {
      this.resetCanvasData()
      this.props.resetcheck()
    }
  }

  setPixel = (imageData, x, y, r, g, b, a) => {
    const index = (x + y * imageData.width) * 4
    imageData.data[index + 0] = r
    imageData.data[index + 1] = g
    imageData.data[index + 2] = b
    imageData.data[index + 3] = a * 255
  }

  analyze = data => {
    if (!data) {
      return { min: 0, max: 255 }
    }
    const results = data.reduce(
      (result, item) => {
        return item.reduce((rowRes, value) => {
          if (!value) {
            return rowRes
          }
          return {
            min: rowRes.min < value ? rowRes.min : value,
            max: rowRes.max > value ? rowRes.max : value,
          }
        }, result)
      },
      { min: 666, max: 0 }
    )
    return results
  }

  updateCanvas = () => {
    // console.log(`${new Date().toISOString()} - updateCanvas`)
    if (!this.props.data) {
      return
    }
    const ctx = this.canvasRef.current.getContext('2d')
    const width = this.props.data[0].length
    const height = this.props.data.length
    const { min, max } = this.analyze(this.props.data)
    const scale = chroma.scale(this.state.colorRange).domain([min, max])
    const imageData = ctx.createImageData(width, height)
    //const start = new Date()
    // console.log(`${start.toISOString()} calculating image`)
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const value = this.props.data[y][x]
        const color = scale(Math.floor(value))
        const rgba = color._rgb
        this.setPixel(imageData, x, y, ...rgba)
      }
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, width, height)
    this.setState({ imgData: imageData })
  }

  resetCanvasData = () => {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.putImageData(this.state.imgData, 0, 0, 0, 0, canvas.width, canvas.height)
    this.setState({
      trakMouse: 'start',
      startMousePointerX: 0,
      startMousePointerY: 0,
      endMousePointerX: 0,
      endMousePointerY: 0,
      rectangleNameCount: 0,
      lineNameCount: 0,
      pointNameCount: 0,
      lines: [],
      rectangles: [],
      points: [],
      colorCode: '',
      colorArray: [],
      hoverBox: {},
    })
  }

  reDrawing = (checkClear = '') => {
    if (checkClear !== 'noClean') {
      const canvas = this.canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.putImageData(this.state.imgData, 0, 0, 0, 0, canvas.width, canvas.height)
    }
    this.drawRectangles()
    this.drawLines()
    this.drawPoints()
  }

  cleanDrawing = () => {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.putImageData(this.state.imgData, 0, 0, 0, 0, canvas.width, canvas.height)
  }

  deleteDrawing = key => {
    if (key.charAt(0) === 'R') {
      const rectangle = [...this.state.rectangles]
      this.setState(
        {
          rectangles: rectangle.filter(item => item.key !== this.props.delKye.key),
        },
        () => {
          this.reDrawing()
        }
      )
    }
    if (key.charAt(0) === 'L') {
      const line = [...this.state.lines]
      this.setState(
        {
          lines: line.filter(item => item.key !== this.props.delKye.key),
        },
        () => {
          this.reDrawing()
        }
      )
    }
    if (key.charAt(0) === 'P') {
      const point = [...this.state.points]
      this.setState(
        {
          points: point.filter(item => item.key !== this.props.delKye.key),
        },
        () => {
          this.reDrawing()
        }
      )
    }
    this.props.resetDelKey()
  }

  drawLines = () => {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    if (this.state.lines.length > 0) {
      this.state.lines.forEach(function(item) {
        ctx.beginPath()
        ctx.strokeStyle = item.color
        ctx.moveTo(item.stPoint.x, item.stPoint.y)
        ctx.lineTo(item.endPoint.x, item.endPoint.y)
        ctx.stroke()
        ctx.closePath()
      })
    }
  }

  drawRectangles = () => {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    if (this.state.rectangles.length > 0) {
      this.state.rectangles.forEach(function(item) {
        ctx.strokeStyle = item.color
        ctx.strokeRect(
          item.stPoint.x,
          item.stPoint.y,
          item.endPoint.x - item.stPoint.x,
          item.endPoint.y - item.stPoint.y
        )
      })
    }
  }

  drawPoints = () => {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    if (this.state.points.length > 0) {
      this.state.points.forEach(function(item) {
        ctx.beginPath()
        ctx.arc(item.stPoint.x, item.stPoint.y, 3, 0, 2 * Math.PI)
        ctx.strokeStyle = item.color
        ctx.stroke()
      })
    }
  }

  calRectangleMinMaxAvg = (data, sx, sy, ex, ey) => {
    var min = 0
    var max = 0
    var count = 0
    var collAva = 0
    if (!data) {
      return { min: 0, max: 0, avg: 0 }
    }
    for (let x = sx; x < ex; x++) {
      for (let y = sy; y < ey; y++) {
        const value = this.props.data[y][x]
        count++
        collAva = collAva + value
        if (max < value) {
          max = value
        } else if (min > value || min === 0) {
          min = value
        }
      }
    }
    return { min: min, max: max, avg: collAva / count }
  }

  calLineMinMaxAvgBySlope = (data, sx, sy, ex, ey) => {
    var min = 0
    var max = 0
    var count = 0
    var collAva = 0
    if (!data) {
      return { min: 0, max: 0, avg: 0 }
    }
    const m = sx === ex ? null : (ey - sy) / (ex - sx)
    const b = m === null ? sx : sy - m * sx
    for (var x = sx; x <= ex; x++) {
      var y = m * x + b
      const value = data[y ^ 0][x]
      count++
      collAva = collAva + value
      if (max < value) {
        max = value
      } else if (min > value || min === 0) {
        min = value
      }
    }
    return { min: min, max: max, avg: collAva / count }
  }

  drawingStart = e => {
    if (this.props.drawingType === 'Point') {
      this.setState({ colorCode: this.getRndColor() })
    }
    if (this.props.drawingType === 'Line') {
      const canvas = this.canvasRef.current
      const ctx = canvas.getContext('2d')
      this.setState({ colorCode: this.getRndColor() })
      ctx.strokeStyle = this.state.colorCode
      const rect = canvas.getBoundingClientRect()
      const posx = (e.clientX - rect.left) ^ 0
      const posy = (e.clientY - rect.top) ^ 0
      this.setState({ startMousePointerX: posx, startMousePointerY: posy, trakMouse: 'end' })
    }
    if (this.props.drawingType === 'Rectangle') {
      const canvas = this.canvasRef.current
      const ctx = canvas.getContext('2d')
      this.setState({ colorCode: this.getRndColor() })
      ctx.strokeStyle = this.state.colorCode
      const rect = canvas.getBoundingClientRect()
      const posx = (e.clientX - rect.left) ^ 0
      const posy = (e.clientY - rect.top) ^ 0
      this.setState({ startMousePointerX: posx, startMousePointerY: posy, trakMouse: 'end' })
      ctx.strokeRect(this.state.startMousePointerX, this.state.startMousePointerY, 0, 0)
    }
  }

  drawingMove = e => {
    console.log(this.state.imgData)
    if (!this.props.data) {
      console.log('no data available')
      return
    }
    const canvas = this.canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    const posx = (e.clientX - rect.left) ^ 0
    const posy = (e.clientY - rect.top) ^ 0
    const { min, max } = this.analyze(this.props.data)
    const scale = chroma.scale(this.state.colorRange).domain([min, max])
    const value = this.props.data[posy][posx]
    const color = scale(Math.floor(value))
    const rgba = color._rgb
    if (this.props.drawingType === 'Rectangle') {
      if (this.state.trakMouse === 'end') {
        this.cleanDrawing()
        ctx.strokeStyle = this.state.colorCode
        ctx.strokeRect(
          this.state.startMousePointerX,
          this.state.startMousePointerY,
          posx - this.state.startMousePointerX,
          posy - this.state.startMousePointerY
        )
        this.reDrawing('noClean')
      }
    }
    if (this.props.drawingType === 'Line') {
      if (this.state.trakMouse === 'end') {
        this.cleanDrawing()
        ctx.beginPath()
        ctx.moveTo(this.state.startMousePointerX, this.state.startMousePointerY)
        ctx.strokeStyle = this.state.colorCode
        ctx.lineTo(posx, posy)
        ctx.stroke()
        ctx.closePath()
        this.reDrawing('noClean')
      }
    }
    this.setState({
      hoverBox: {
        x: posx,
        y: posy,
        color: rgba,
        heat: value,
        left: e.clientX,
        top: e.clientY,
        active: true,
      },
    })
  }

  drawingEnd = e => {
    if (this.props.drawingType === 'Point') {
      const canvas = this.canvasRef.current
      const ctx = canvas.getContext('2d')
      const rect = canvas.getBoundingClientRect()
      const posx = (e.clientX - rect.left) ^ 0
      const posy = (e.clientY - rect.top) ^ 0
      this.cleanDrawing()
      ctx.beginPath()
      ctx.strokeStyle = this.state.colorCode
      ctx.arc(posx, posy, 3, 0, 2 * Math.PI)
      ctx.stroke()
      this.reDrawing('noClean')
      this.setState({
        points: this.state.points.concat({
          stPoint: { x: posx, y: posy },
          x: posx,
          y: posy,
          color: this.state.colorCode,
          key: 'P' + this.state.pointNameCount,
        }),
      })
      const value = this.props.data[posy][posx]
      this.props.tableData(
        value.toFixed(2),
        value.toFixed(2),
        value.toFixed(2),
        'P' + this.state.pointNameCount,
        this.state.colorCode
      )
      this.setState({ pointNameCount: this.state.pointNameCount + 1 })
    }
    if (this.props.drawingType === 'Line') {
      const canvas = this.canvasRef.current
      const rect = canvas.getBoundingClientRect()
      const posx = (e.clientX - rect.left) ^ 0
      const posy = (e.clientY - rect.top) ^ 0
      if (posx === this.state.startMousePointerX) {
        this.setState({
          trakMouse: 'start',
        })
        return
      }
      const x =
        posx > this.state.startMousePointerX && posy > this.state.startMousePointerY
          ? this.state.startMousePointerX
          : posx
      const y =
        posx > this.state.startMousePointerX && posy > this.state.startMousePointerY
          ? this.state.startMousePointerY
          : posy
      const sx = this.state.startMousePointerX < posx ? this.state.startMousePointerX : posx
      const sy = this.state.startMousePointerY < posy ? this.state.startMousePointerY : posy
      const ex = this.state.startMousePointerX < posx ? posx : this.state.startMousePointerX
      const ey = this.state.startMousePointerY < posy ? posy : this.state.startMousePointerY
      const slopeData = this.calLineMinMaxAvgBySlope(this.props.data, sx, sy, ex, ey)
      this.props.tableData(
        slopeData.max.toFixed(2),
        slopeData.min.toFixed(2),
        slopeData.avg.toFixed(2),
        'L' + this.state.lineNameCount,
        this.state.colorCode
      )
      this.setState({
        endMousePointerX: posx,
        endMousePointerY: posy,
        trakMouse: 'start',
        lines: this.state.lines.concat({
          stPoint: { x: this.state.startMousePointerX, y: this.state.startMousePointerY },
          endPoint: { x: posx, y: posy },
          x: x,
          y: y,
          color: this.state.colorCode,
          key: 'L' + this.state.lineNameCount,
        }),
        lineNameCount: this.state.lineNameCount + 1,
      })
    }
    if (this.props.drawingType === 'Rectangle') {
      const canvas = this.canvasRef.current
      const rect = canvas.getBoundingClientRect()
      const posx = (e.clientX - rect.left) ^ 0
      const posy = (e.clientY - rect.top) ^ 0
      if (posx === this.state.startMousePointerX) {
        this.setState({
          trakMouse: 'start',
        })
        return
      }

      const sx = this.state.startMousePointerX < posx ? this.state.startMousePointerX : posx
      const sy = this.state.startMousePointerY < posy ? this.state.startMousePointerY : posy
      const ex = this.state.startMousePointerX < posx ? posx : this.state.startMousePointerX
      const ey = this.state.startMousePointerY < posy ? posy : this.state.startMousePointerY
      const maxMinAvg = this.calRectangleMinMaxAvg(this.props.data, sx, sy, ex, ey)
      this.props.tableData(
        maxMinAvg.max.toFixed(2),
        maxMinAvg.min.toFixed(2),
        maxMinAvg.avg.toFixed(2),
        'R' + this.state.rectangleNameCount,
        this.state.colorCode
      )
      this.setState({
        endMousePointerX: posx,
        endMousePointerY: posy,
        trakMouse: 'start',
        rectangles: this.state.rectangles.concat({
          stPoint: { x: this.state.startMousePointerX, y: this.state.startMousePointerY },
          endPoint: { x: posx, y: posy },
          x: sx,
          y: sy,
          color: this.state.colorCode,
          key: 'R' + this.state.rectangleNameCount,
        }),
        rectangleNameCount: this.state.rectangleNameCount + 1,
      })
    }
  }

  getRndColor = () => {
    let color
    for (let i = 0; i >= 0; i++) {
      let r = (255 * Math.random()) | 0,
        g = (255 * Math.random()) | 0,
        b = (255 * Math.random()) | 0,
        a = 1
      color = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
      if (
        this.state.colorArray.indexOf(color) > -1 ||
        this.state.canvasColors.indexOf(color) > -1
      ) {
        continue
      } else {
        this.setState({ colorArray: this.state.colorArray.concat(color) })
        break
      }
    }
    return color
  }

  changeCanvasColorRange = colorscale => {
    this.setState({ colorRange: colorscale }, () => {
      this.updateCanvas()
      this.reDrawing('noClean')
    })
  }

  render() {
    const width = this.props.data[0].length
    const height = this.props.data.length
    const { min, max } = this.analyze(this.props.data)
    return (
      <CanvasWrap>
        <ColorPicker
          colorRange={this.state.colorRange}
          changeCanvasColorRange={this.changeCanvasColorRange}
        />
        <div>
          <DrawingNames
            rectangles={this.state.rectangles}
            lines={this.state.lines}
            points={this.state.points}
          />
          <canvas
            id="imgCanvas"
            ref={this.canvasRef}
            width={width}
            height={height}
            onMouseDown={e => {
              this.drawingStart(e)
            }}
            onMouseUp={e => {
              this.drawingEnd(e)
            }}
            onMouseMove={e => {
              this.drawingMove(e)
            }}
            onMouseLeave={e => {
              this.setState({
                hoverBox: {
                  x: 0,
                  y: 0,
                  color: [0, 0, 0, 0],
                  heat: 0,
                  left: 0,
                  top: 0,
                  active: false,
                },
              })
            }}
          />
          <DrawDetails data={this.state.hoverBox} />
          <ColorScales
            minmax={[min, max]}
            colorRange={this.state.colorRange}
            scaleheight={this.props.data.length}
          />
        </div>
      </CanvasWrap>
    )
  }
}

export default Canvas
