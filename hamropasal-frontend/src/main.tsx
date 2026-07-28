import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const rootEl = document.getElementById('root')
if (!rootEl) {
  document.body.innerHTML = '<div style="color:red;padding:20px;font-family:monospace">FATAL: #root element missing from index.html</div>'
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
