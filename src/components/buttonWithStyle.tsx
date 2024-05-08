import React from 'react'

interface Props {
  children: React.ReactNode;
  disabled: boolean;
}

export default function buttonWithStyle({ children, disabled } : Props) {
  return (
    <>
      <button disabled={disabled} type='submit' className={`bg-zinc-900 text-white font-semibold py-3 w-full rounded-3xl hover:bg-zinc-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}>{children}</button>
    </>
  )
}
