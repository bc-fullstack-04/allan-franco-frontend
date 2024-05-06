import React from 'react'

interface Props {
  children: React.ReactNode;
  underline?: Boolean
}

export default function buttonWithoutStyle({ children, underline } : Props) {
  return (
    <>
      <button className={`text-zinc-900 font-semibold ${underline ? 'underline' : ''}`}>{children}</button>
    </>
  )
}
