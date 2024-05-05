import React from 'react'
import Button from '../../components/button'
import Logo from '../../components/logo'

export default function index() {
  return (
    <div className="h-screen bg-background bg-no-repeat bg-cover"> {/* Background Image Div Only */}
        <main className='flex flex-col absolute w-screen h-screen bg-neutral-950 bg-opacity-50'>
          <nav className='flex flex-row items-center justify-between w-full bg-white bg-opacity-30 py-3 px-24'>
            <div className='flex items-center'>
              <Logo />
              <h1 className='text-white text-xl'>BootPlay</h1>
            </div>
            <div className='flex w-96 gap-4'>
              <Button color={"bg-neutral-950"} textColor={"text-white"} bold={"font-semibold"}>Entrar</Button>
              <Button color={"bg-sky-200"} bold={"font-semibold"}>Inscrever-se</Button>
            </div>
          </nav>

          <section className='flex flex-col h-full justify-center gap-8 p-4'>
            <div className='flex flex-col w-2/6 gap-8'>
              <h1 className='text-5xl font-bold text-white'>A Historia da música não pode ser esquecida!</h1>
              <span className='text-white'>Crie já sua conta e curta os sucessos que marcaram os tempos no Vinil.</span>
            </div>
            <div>
              <Button color={"bg-sky-200"} bold={"font-semibold"} sizeWidth={"py-3"} sizeHeight={"px-12"}>Inscrever-se</Button>
            </div>
          </section>
        </main>
    </div>
  )
}
