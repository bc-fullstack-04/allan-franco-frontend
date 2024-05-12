import React from 'react'

interface Props {
  children: React.ReactNode;
  type: string;
  required?: boolean;
  style?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export default function Input({ children, type, required, onChange,value  } : Props) {
  return (
    <>
      <label className="flex flex-col w-full text-sm font-normal text-zinc-600 gap-1">
        {children}
        <input onChange={onChange} type={type} required={required} value={value} className="bg-zinc-50 w-full ring-1 ring-zinc-300 text-zinc-800 focus:ring-zinc-400 focus:outline-none h-8 p-2 rounded-md" />
      </label>
    </>
  )
}