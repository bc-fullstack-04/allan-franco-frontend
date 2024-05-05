import React from 'react'

interface Props {
  children: React.ReactNode;
  color: String;
  textColor?: String;
  sizeWidth?: String;
  sizeHeight?: String;
  bold?: String;
}

export default function button({ children, color, textColor, sizeHeight = "px-8", sizeWidth = "py-2", bold } : Props) {
  return (
    <>
      <button className={`${color} ${textColor} ${bold} ${sizeWidth} ${sizeHeight} w-fit rounded-3xl`}>{children}</button>
    </>
  )
}
