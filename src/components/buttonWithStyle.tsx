import React from 'react'

interface Props {
  children: React.ReactNode;
  color?: String;
  textColor?: String;
  sizeWidth?: String;
  sizeHeight?: String;
  bold?: String;
  full?: Boolean;
}

export default function buttonWithStyle({ children, color = "bg-zinc-900", textColor = "text-white", bold, sizeWidth = "px-8", sizeHeight = "py-2", full } : Props) {
  return (
    <>
      <button className={`${color} ${textColor} ${bold} ${sizeWidth} ${sizeHeight} ${full ? 'w-full' : ''} rounded-3xl`}>{children}</button>
    </>
  )
}
