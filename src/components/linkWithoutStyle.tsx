import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  path: string;
  underline?: boolean;
  textColor?: string;
  hover?: boolean
}

export default function linkWithoutStyle({ children, path, underline, textColor = "text-zinc-900", hover } : Props) {
  return (
    <>
      <Link to={path} className={`${textColor} font-semibold ${underline ? 'hover:underline' : ''} ${hover ? 'hover:text-zinc-900 transition duration-200' : ''} `}>{children}</Link>
    </>
  )
}
