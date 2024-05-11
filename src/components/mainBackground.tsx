import React from 'react'

interface Props{
    children: React.ReactNode
    blur?: boolean
}

export default function mainBackground({children, blur} : Props) {
  return (
        <div className="w-screen h-screen relative bg-backgroundGeneral bg-no-repeat bg-cover">
            {/* BACKDROP */}
            <div className={`w-full h-full absolute z-0 backdrop-brightness-50 ${blur ? "backdrop-blur-sm" : ""}`} />
            
            {/* CONTENT */}
            {children}
        </div>
  )
}
