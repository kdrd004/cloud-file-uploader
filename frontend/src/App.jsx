import React from 'react'
import FileUpload from './components/FileUpload'
import './App.css'

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">☁️ Cloud File Uploader</span>
        </div>
      </nav>
      <FileUpload />
    </div>
  )
}

export default App
