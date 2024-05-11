import React from 'react'

interface Props {
  children: React.ReactNode;
  disabled: boolean;
  bgColor?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function buttonWithStyle({ children, disabled, bgColor = "bg-zinc-900 hover:bg-zinc-800", onClick } : Props) {
  return (
    <>
      <button disabled={disabled} onClick={onClick} type='submit' className={`${bgColor} text-white font-semibold py-3 w-full rounded-3xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}>{children}</button>
    </>
  )
}
