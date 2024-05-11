import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../assets/logo.svg'
import CloseButton from '../assets/close.png'
import Input from './input'
import ButtonWithStyle from './buttonWithStyle'
import LinkWithoutStyle from './linkWithoutStyle'

interface Props {
  children: React.ReactNode
  title: string
}

export default function sign({children, title} : Props) {
  return (
    <>
      {/* CONTENT */}
      <div className="flex flex-col items-center justify-center relative bg-white w-[420px] h-fit rounded-3xl shadow-lg px-12 py-4">
      {/* CLOSE BUTTON */}
      <div className="flex items-center justify-end w-full h-fit">
        <Link to="/" className="absolute top-0 right-0 p-4"><img src={CloseButton} alt="Close Button" className="p-1 bg-zinc-50 hover:bg-zinc-100 rounded-full" /></Link>
      </div>

      {/* TITLE */}
      <div className="flex flex-col items-center gap-2 w-full py-6">
        <img src={Logo} />
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>

      {/* FORMS && FOOTER*/}
      {children}

      
    </div>
    </>
  )
}
