import LinkWithStyle from "@/components/linkWithStyle";
import TopBar from "@/components/topBar";
import MainBackground from "@/components/mainBackground";
import { Link } from "react-router-dom";

export default function index() {
  return (
    <MainBackground>
      {/* MAIN / BODY */}
      <div className="flex flex-col w-full h-full">
        {/* TOPBAR */}
        <TopBar />

        {/* CONTENT */}
        <section className="flex flex-col h-full justify-center gap-8 px-16 z-10">
          {/* TEXT */}
          <div className="flex flex-col w-full lg:w-[50%] md:w-[75%] gap-8">
            <h1 className="text-5xl font-bold text-white leading-tight">
              A história da música não pode ser esquecida!
            </h1>
            <span className="text-white ">
              Crie já sua conta e curta os sucessos que marcaram os tempos no
              vinil.
            </span>
          </div>
          <div>
            <LinkWithStyle path="/sign-up" color="bg-sky-200" textSize="text-lg md:text-xl" textColor="text-black" sizeWidth="px-12" sizeHeight="py-3" hover="hover:bg-sky-100">Inscrever-se</LinkWithStyle>
          </div>
        </section>
      </div>
    </MainBackground>
  );
}
