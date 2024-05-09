import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/authContext'

import PrivateRoute from './utils/privateRoute'

import NotFound from './pages/errors/notFound'
import Home from './pages/home/index'
import SignIn from './pages/signin/index'
import SignUp from './pages/signup/index'
import Profile from './pages/profile/index'

import '../app/globals.css'
import './globals.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path='' element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.Fragment>
)
