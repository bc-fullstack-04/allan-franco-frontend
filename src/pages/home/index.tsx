import React from "react";
import ButtonWithStyle from "../../components/buttonWithStyle";
import Logo from "../../components/logo";

export default function index() {
  return (
    // BACKGROUND IMAGE DIV ONLY
    <div className="h-screen bg-background bg-no-repeat bg-cover">
      {/* MAIN / BODY */}
      <main className="flex flex-col absolute w-screen h-screen bg-neutral-950 bg-opacity-50">
        {/* TOPBAR */}
        <nav className="flex flex-row items-center justify-between w-full bg-white bg-opacity-30 backdrop-blur-lg py-3 px-24">
          {/* LOGO && TITLE */}
          <div className="flex items-center">
            <Logo />
            <h1 className="text-white text-xl">BootPlay</h1>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex w-96 gap-4">
            <ButtonWithStyle bold={"font-semibold"}>Entrar</ButtonWithStyle>
            <ButtonWithStyle color={"bg-sky-200"} textColor={"text-black"} bold={"font-semibold"}>Inscrever-se</ButtonWithStyle>
          </div>
        </nav>

        {/* CONTENT */}
        <section className="flex flex-col h-full justify-center gap-8 p-4">
          {/* TEXT */}
          <div className="flex flex-col w-2/6 gap-8">
            <h1 className="text-5xl font-bold text-white">
              A história da música não pode ser esquecida!
            </h1>
            <span className="text-white">
              Crie já sua conta e curta os sucessos que marcaram os tempos no
              vinil.
            </span>
          </div>

          {/* ACTION BUTTON */}
          <div>
            <ButtonWithStyle color={"bg-sky-200"} textColor={"text-black"} bold={"font-semibold"} sizeWidth={"py-3"} sizeHeight={"px-12"}>Inscrever-se</ButtonWithStyle>
          </div>
        </section>
      </main>
    </div>
  );
}
