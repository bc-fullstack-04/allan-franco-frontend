import React from "react";

import CloseButton from '../../assets/close.png';

import Logo from "../../components/logo";
import Input from "../../components/input";
import ButtonWithStyle from "../../components/buttonWithStyle";
import LinkWithoutStyle from "../../components/linkWithoutStyle";
import { Link } from "react-router-dom";

export default function index() {
  return (
    // BACKGROUND IMAGE DIV ONLY
    <div className="h-screen bg-backgroundGeneral bg-no-repeat bg-cover">
      {/* MAIN / BODY */}
      <main className="flex flex-col absolute w-screen h-screen backdrop-brightness-50 backdrop-blur-sm">
        <section className="flex flex-row items-center justify-center h-full w-full">
          {/* CONTENT */}
          <div className="flex flex-col items-center justify-center relative bg-white w-[420px] h-fit rounded-3xl shadow-lg px-12 py-4">
            {/* CLOSE BUTTON */}
            <div className="flex items-center justify-end w-full h-fit">
              <Link to="/" className="absolute top-0 right-0 p-4"><img src={CloseButton} alt="Close Button" className="p-1 bg-zinc-50 hover:bg-zinc-100 rounded-full" /></Link>
            </div>
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
              <ButtonWithStyle>Entrar</ButtonWithStyle>
            </form>

            {/* FOOTER */}
            <div>
              <p className="text-sm text-zinc-500">
                Ainda não tem uma conta?{" "}
                <LinkWithoutStyle path="/sign-up" underline>Inscrever-se</LinkWithoutStyle>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
