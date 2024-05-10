import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  path: string;
  color?: string;
  textSize?: string;
  textColor?: string;
  sizeWidth?: string;
  sizeHeight?: string;
  full?: boolean;
  hover?: string;
}

export default function linkWithStyle({ children, path, color = "bg-zinc-900", textSize = "text-sm md:text-lg", textColor = "text-white", sizeWidth = "px-4 md:px-8", sizeHeight = "py-1 md:py-2", full, hover = "hover:bg-zinc-800" } : Props) {
  return (
    <>
      <Link to={path} replace={true} className={`${color} ${textColor} text-center align-center font-semibold ${sizeWidth} ${sizeHeight} ${full ? 'w-full' : ''} rounded-3xl ${hover} transition duration-200 ${textSize}`}>{children}</Link>
    </>
  )
}
