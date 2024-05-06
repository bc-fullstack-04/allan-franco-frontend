import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home/index'
import SignIn from './pages/singin/index'
import '../app/globals.css'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SignIn />
  </React.StrictMode>,
)
