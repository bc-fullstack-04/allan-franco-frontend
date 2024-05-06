import React from "react";
import Logo from "../../components/logo";
import Input from "../../components/input";
import ButtonWithStyle from "../../components/buttonWithStyle";
import ButtonWithoutStyle from "../../components/buttonWithoutStyle";

export default function index() {
  return (
    // BACKGROUND IMAGE DIV ONLY
    <div className="h-screen bg-backgroundGeneral bg-no-repeat bg-cover">
      {/* MAIN / BODY */}
      <main className="flex flex-col absolute w-screen h-screen backdrop-brightness-50 backdrop-blur-sm">
        <section className="flex flex-row items-center justify-center h-full w-full">
          {/* CONTENT */}
          <div className="flex flex-col items-center justify-center bg-white w-[420px] h-fit rounded-3xl shadow-lg px-12 py-4">
              {/* TITLE */}
              <div className="flex flex-col items-center gap-2 w-full py-6">
                <Logo />
                <h1 className="text-2xl font-medium">Acesse sua conta</h1>
              </div>

              {/* FORMS */}
              <form className="flex flex-col items-center mb-8 gap-4 w-full">
                <Input type="email" required>
                  E-mail
                </Input>
                <Input type="password" required>
                  Password
                </Input>
                <ButtonWithStyle full sizeHeight={"py-3"}>Entrar</ButtonWithStyle>
              </form>

              {/* FOOTER */}
              <div>
                <p className="text-sm text-zinc-500">
                  Ainda não tem uma conta? <ButtonWithoutStyle underline>Inscrever-se</ButtonWithoutStyle>
                </p>
              </div>
          </div>
        </section>
      </main>
    </div>
  );
}
