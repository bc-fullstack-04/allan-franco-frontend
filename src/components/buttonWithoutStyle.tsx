import React from 'react'

interface Props {
  children: React.ReactNode;
  underline?: Boolean;
  textColor?: String;
}

export default function buttonWithoutStyle({ children, underline, textColor = "text-zinc-900" } : Props) {
  return (
    <>
      <button className={`${textColor} font-semibold ${underline ? 'underline' : ''} hover:text-zinc-800 transition duration-200`}>{children}</button>
    </>
  )
}
