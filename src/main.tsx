import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home/index'
import SignIn from './pages/signin/index'
import SignUp from './pages/signup/index'
import '../app/globals.css'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SignUp />
  </React.StrictMode>,
)
