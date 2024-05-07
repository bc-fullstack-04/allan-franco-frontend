import React from 'react'

interface Props {
  children: React.ReactNode;
}

export default function buttonWithStyle({ children } : Props) {
  return (
    <>
      <button className={`bg-zinc-900 text-white font-semibold py-3 w-full rounded-3xl hover:bg-zinc-800 transition duration-200`}>{children}</button>
    </>
  )
}
