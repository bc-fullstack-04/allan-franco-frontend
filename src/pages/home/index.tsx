import React from "react";
import LinkWithStyle from "../../components/linkWithStyle";
import Logo from "../../components/logo";

export default function index() {
  return (
    // BACKGROUND IMAGE DIV ONLY
    <div className="h-screen bg-backgroundGeneral bg-no-repeat bg-cover">
      {/* MAIN / BODY */}
      <main className="flex flex-col absolute w-screen h-screen bg-neutral-950 bg-opacity-50">
        {/* TOPBAR */}
        <nav className="flex flex-row items-center justify-between w-full bg-white bg-opacity-30 backdrop-blur-lg py-3 px-4 lg:px-16">
          {/* LOGO && TITLE */}
          <div className="flex items-center">
            <Logo />
            <h1 className="text-white text-md md:text-xl">BootPlay</h1>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end w-96 gap-4">
            <LinkWithStyle path="/sign-in">Entrar</LinkWithStyle>
            <LinkWithStyle path="/sign-up" color="bg-sky-200" textColor="text-black" hover="hover:bg-sky-100">Inscrever-se</LinkWithStyle>
          </div>
        </nav>

        {/* CONTENT */}
        <section className="flex flex-col h-full justify-center gap-8 px-16">
          {/* TEXT */}
          <div className="flex flex-col w-full lg:w-[50%] md:w-[75%] gap-8">
            <h1 className="text-5xl font-bold text-white leading-tight">
              A história da música não pode ser esquecida!
            </h1>
            <span className="text-white">
              Crie já sua conta e curta os sucessos que marcaram os tempos no
              vinil.
            </span>
          </div>

          {/* ACTION BUTTON */}
          <div>
            <LinkWithStyle path="/sign-up" color="bg-sky-200" textSize="text-lg md:text-xl" textColor="text-black" sizeWidth="px-12" sizeHeight="py-3" hover="hover:bg-sky-100">Inscrever-se</LinkWithStyle>
          </div>
        </section>
      </main>
    </div>
  );
}
