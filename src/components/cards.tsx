import React from 'react'

interface Props {
    title: string;
    content: string;
    img: string;
}

export default function cards({ title, content, img } : Props) {
  return (
    <>
    <div className='flex w-full sm:w-fit items-center justify-center p-6 bg-white rounded-md shadow-[0_4px_4px_0_rgba(174,174,174,0.25)]'>
        <div className='flex w-full h-full items-center justify-center gap-4'>
            <div className='flex min-h-fit min-w-fit items-center justify-center'>
                <div className='bg-black rounded-full p-2'>
                    <img src={img} className='w-6 h-6'/>
                </div>
            </div>
            <div className="h-full min-w-fit flex flex-col items-start justify-between ">
                <h1 className="text-md font-semibold p-0">{title}</h1>
                <span className='text-2xl font-semibold'>{content}</span>
            </div>
        </div>
    </div>
    </>
  )
}
