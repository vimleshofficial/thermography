import React, { useState } from 'react'
import Dropzone from './ThermoComponents/Dropzone'
import Loader from 'react-loader-spinner'
import csv from 'csv'
import Canvas from './Canvas'
import DataTable from './ThermoComponents/DataTable'
import FileList from './ThermoComponents/FileList'
import ToolBar from './ThermoComponents/ToolBar'
import Sidebar from './ThermoComponents/Sidebar'
import { TableWrap } from './StyledComponents'

const ThermographicImage = () => {
  const [file, setFile] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState({ loading: false })
  const [drawingType, setDrawingType] = useState({ type: '' })
  const [maxMinAvr, setMaxMinAvr] = useState({ td: [] })
  const [resetdata, setResetdata] = useState({ reset: 'noReset' })
  const [delKye, setDelKey] = useState({ key: '' })
  const resetDelKey = () => {
    setDelKey({ key: '' })
  }

  const resetcheck = () => {
    setResetdata({ reset: '' })
  }

  const resetAll = () => {
    setMaxMinAvr({ td: [] })
    setResetdata({ reset: 'reset' })
  }

  const drawingActive = event => {
    const links = document.querySelectorAll('.navset')
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('active')
    }
    event.target.classList.add('active')
    setDrawingType({ type: event.target.title })
  }

  const tableData = (mx, mi, avr, count, color) => {
    setMaxMinAvr({
      td: maxMinAvr.td.concat({ mx: mx, mi: mi, avr: avr, count: count, key: count, color: color }),
    })
  }

  const deleteDrawing = key => {
    const maxMinAvrData = [...maxMinAvr.td]
    setMaxMinAvr({ td: maxMinAvrData.filter(item => item.key !== key) })
    setDelKey({ key: key })
  }

  const setCanvasData = (data, filename) => {
    setLoading({ loading: true })
    if (resetdata.reset !== 'noReset') resetAll()
    csv.parse(
      data,
      {
        delimiter: ';',
        cast: value => {
          return parseFloat(value.replace(',', '.'), 100)
        },
      },
      (err, data) => {
        setData(data)
        setFile(filename)
        setLoading({ loading: false })
        setResetdata({ reset: '' })
      }
    )
  }

  return (
    <div>
      <Loader
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'rgba(34, 34, 34, 0.6)',
          zIndex: '9',
        }}
        type="ThreeDots"
        color="#00BFFF"
        height={50}
        width={50}
        visible={loading.loading}
      />
      <Sidebar position="left">
        <FileList setCanvasData={setCanvasData} />
        <ToolBar resetAll={resetAll} drawingActive={drawingActive} />
      </Sidebar>
      <div>
        <div>
          {data && (
            <Canvas
              resetDelKey={resetDelKey}
              delKye={delKye}
              resetcheck={resetcheck}
              resetdata={resetdata}
              drawingType={drawingType.type}
              data={data}
              tableData={tableData}
            />
          )}
        </div>
        {file || 'Select a file'}
        <Dropzone setCanvasData={setCanvasData} accept=".csv" />
      </div>
      <Sidebar position="right">
        <TableWrap>
          <DataTable deleteDrawing={deleteDrawing} data={maxMinAvr.td} />
        </TableWrap>
      </Sidebar>
    </div>
  )
}

export default ThermographicImage
