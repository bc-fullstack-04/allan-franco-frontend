import React from "react";
import Logo from "../../components/logo";
import Input from "../../components/input";
import ButtonWithStyle from "../../components/buttonWithStyle";
import ButtonWithoutStyle from "../../components/buttonWithoutStyle";

export default function index() {
  return (
    // BACKGROUND IMAGE DIV ONLY
    <div className="h-screen bg-background bg-no-repeat bg-cover">
      {/* MAIN / BODY */}
      <main className="flex flex-col absolute w-screen h-screen backdrop-brightness-50 backdrop-blur-sm">
        <section className="flex flex-row items-center justify-center h-full w-full">
          {/* BASE CONTENT */}
          <div className="flex flex-col items-center justify-center bg-white w-[420px] h-fit rounded-3xl shadow-lg p-6">
            {/* CLOSE BUTTON */}
            <div className="flex justify-end w-full">
              <div className="flex p-1 bg-zinc-100 rounded-full hover:bg-zinc-300 cursor-pointer">
                <button className="bg-close bg-no-repeat bg-contain p-2"></button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col items-center w-full h-full px-6">
              {/* TITLE */}
              <div className="flex flex-col items-center gap-2 mb-6 w-full">
                <Logo />
                <h1 className="text-2xl font-medium">Criar conta</h1>
              </div>

              {/* FORMS */}
              <form className="flex flex-col items-center mb-8 gap-4 w-full">
                <Input type="text" required>
                  Nome Completo
                </Input>
                <Input type="email" required>
                  E-mail
                </Input>
                <Input type="password" required>
                  Password
                </Input>
                <ButtonWithStyle full sizeHeight={"py-3"}>Criar conta</ButtonWithStyle>
              </form>

              {/* FOOTER */}
              <div>
                <p className="text-sm text-zinc-500">
                  Já tem uma conta? <ButtonWithoutStyle underline>Entrar</ButtonWithoutStyle>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
