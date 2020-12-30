import React from 'react'
import csvFile1 from '../files/WIRIS640_14-38-09_13-01-2018.csv'
import csvFile2 from '../files/WIRIS640_14-49-14_03-09-2019.csv'
import csvFile3 from '../files/WIRIS640_14-53-27_03-09-2019.csv'
import { FileLists, FileButton } from '../StyledComponents'

const FileList = ({ fileList, setCanvasData }) => {
  const setPath = event => {
    const fileName = event.target.value
    if (event.target.name === 'file1') {
      //csvData(event.target.value, csvFile1, 'default-file')
      fetch(csvFile1)
        .then(r => r.text())
        .then(text => {
          setCanvasData(text, fileName)
        })
    }
    if (event.target.name === 'file2') {
      //  csvData(event.target.value, csvFile2, 'default-file')
      fetch(csvFile2)
        .then(r => r.text())
        .then(text => {
          setCanvasData(text, fileName)
        })
    }
    if (event.target.name === 'file3') {
      //csvData(event.target.value, csvFile3, 'default-file')
      fetch(csvFile3)
        .then(r => r.text())
        .then(text => {
          setCanvasData(text, fileName)
        })
    }
  }
  return (
    <FileLists>
      <FileButton
        type="button"
        name="file1"
        value="WIRIS640_14-38-09_13-01-2018.csv"
        onClick={setPath}
      />
      <FileButton
        type="button"
        name="file2"
        value="WIRIS640_14-49-14_03-09-2019.csv"
        onClick={setPath}
      />
      <FileButton
        type="button"
        name="file3"
        value="WIRIS640_14-53-27_03-09-2019.csv"
        onClick={setPath}
      />
    </FileLists>
  )
}

export default FileList
