import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NotFound from './pages/errors/notFound'
import Home from './pages/home/index'
import SignIn from './pages/signin/index'
import SignUp from './pages/signup/index'
import Profile from './pages/profile/index'

import '../app/globals.css'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  </React.Fragment>
)
