import React from "react";

import LinkWithoutStyle from "../../components/linkWithoutStyle";
import Logo from "../../components/logo";
import SearchIcon from "../../assets/searchIcon.svg";

export default function index() {
  return (
    <div className="flex flex-col h-screen w-screen">
      {/* BACKGROUND IMAGE DIV ONLY */}
      <div className="flex w-full h-full -mb-14 bg-[url('./assets/background_profile.jpg')] bg-cover bg-center bg-no-repeat">
        {/* MAIN / BODY */}
        <main className="flex flex-col w-full h-full bg-neutral-950 bg-opacity-50">
          {/* TOPBAR */}
          <nav className="flex flex-row items-center justify-between w-full bg-white bg-opacity-30 backdrop-blur-sm py-3 px-16">
            {/* LOGO && TITLE */}
            <div className="flex items-center">
              <Logo />
              <h1 className="text-white text-xl">BootPlay</h1>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end w-96 gap-8">
              <LinkWithoutStyle path="" textColor="text-white" hover={true}>
                Meus Discos
              </LinkWithoutStyle>
              <LinkWithoutStyle path="" textColor="text-white" hover={true}>
                Carteira
              </LinkWithoutStyle>
              <button className="bg-[url('./assets/logo_profile.jpg')] bg-no-repeat bg-cover w-[50px] h-[50px] rounded-full"></button>
            </div>
          </nav>

          {/* CONTENT */}
          <section className="flex flex-col h-full justify-center gap-8 p-8">
            {/* TEXT */}
            <div className="flex flex-col w-[450px] gap-8">
              <h1 className="text-4xl font-bold text-white">
                A história da música não pode ser esquecida!
              </h1>
              <span className="text-white">
                Sucessos que marcaram o tempo!!!
              </span>
            </div>
          </section>
        </main>
      </div>

      <div className="flex flex-col justify-center gap-4 w-full h-full bg-gradient-to-t from-[#19181F] from-90%">
        <div className="flex justify-center items-center w-full">
          <div className="flex items-center justify-end">
            <input
              type="text"
              className="bg-[#19181F] ring-1 ring-white text-white hover:ring-2 focus:ring-2 focus:outline-none rounded-md w-96 p-2 pr-14"
            />
            <img src={SearchIcon} className="absolute p-4"></img>
          </div>
        </div>
        <div className="flex flex-col justify-center px-20 gap-4">
          <h1 className="text-5xl text-white">Trends</h1>
          {/* Card */}
          <div className="flex h-56 w-56 items-center justify-center backdrop-brightness-50 p-6 rounded-sm shadow-cards">
            <h1 className="text-3xl font-semibold text-center text-white">
              Teste
            </h1>
          </div>
          {/* Card */}
        </div>
      </div>
    </div>
  );
}
