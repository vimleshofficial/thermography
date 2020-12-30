import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ThermographicImage from './ThermographicImage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThermographicImage />
      </header>
    </div>
  )
}

export default App
