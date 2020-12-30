import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ setCanvasData }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      var file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = () => {
        setCanvasData(reader.result, file.path)
      }
      reader.readAsBinaryString(file)
      // filesSelected(acceptedFiles)
    },
    [setCanvasData]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <h2>
          Upload or drop your <font color="#00A4FF">CSV</font>
          <br /> file here.
        </h2>
      )}
    </div>
  )
}

export default Dropzone
