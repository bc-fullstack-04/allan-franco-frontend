import React, { FormEvent, useEffect, useState } from "react";

// import { album_api } from '@/services/apiServices';
import { albumModel } from "@/models/albumModel";
import { userModel } from "@/models/userModel";
import { useAuth } from "@/context/authContext";
import { useAlbums } from "@/context/albumContext";

import LinkWithoutStyle from "@/components/linkWithoutStyle";
import Logo from "@/components/logo";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// SHADCN CAROUSEL
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// SHADCN DROPDOWN MENU
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LogoutIcon from "@/assets/logoutIcon.svg";

export default function index() {
  const [users, setUser] = useState<userModel>();
  const [albums, setAlbums] = useState<albumModel[]>([]);

  const [isSearchingAlbums, setIsSearchingAlbums] = useState(false);

  const { logout } = useAuth();
  const { searchAlbums } = useAlbums();
  const navigate = useNavigate();

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  useEffect(() => {
    const userStorageData = localStorage.getItem("@Auth.Data");
    setUser(userStorageData != null ? JSON.parse(userStorageData) : null);

    handleAlbums();
  }, []);

  async function handleAlbums(e?: FormEvent) {
    let search: string;
  
    if (e) {
      e.preventDefault();

      setIsSearchingAlbums(true);

      const formData = new FormData(e.target);
      const objectInput = Object.fromEntries(formData);
      search = JSON.stringify(objectInput.search);
    } else {
      search = 'Rock';
    }
  
    const results = await searchAlbums(search);
    setAlbums(results);
  }

  async function handleLogout() {
    toast.loading("Saindo...");

    logout()
      .then(() => {
        setTimeout(() => {
          navigate("/");
          toast.success("Logout efetuado com sucesso!");
        }, 2000);
      })
      .catch(() => {
        toast.error("Erro ao sair. Tente novamente mais tarde!");
      });
  }

  function handleLink(url: string) {
    window.open(url, "_blank");
  }

  return (
    // MAIN / BODY
    <div className={"flex flex-col min-h-screen"}>
      {/* CONTENT + TOPBAR + HEADER */}
      <div className="flex h-[50vh] relative bg-[url('./assets/background_profile.jpg')] bg-center bg-cover bg-no-repeat">
        {/* MAIN / BODY */}
        <main className="flex flex-col w-full h-full bg-neutral-950 bg-opacity-50">
          {/* TOPBAR */}
          <nav className="flex flex-row items-center justify-between w-full bg-white bg-opacity-30 backdrop-blur-sm py-3 px-4 lg:px-16">
            {/* LOGO && TITLE */}
            <div className="flex items-center">
              <Logo />
              <h1 className="text-white text-xl">BootPlay</h1>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end w-96 gap-2 sm:gap-8">
              <LinkWithoutStyle path="" textColor="text-white" hover={true}>
                Meus Discos
              </LinkWithoutStyle>
              <LinkWithoutStyle path="" textColor="text-white" hover={true}>
                Carteira
              </LinkWithoutStyle>

              {/* DROPDOWN */}
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-[url('./assets/logo_profile.jpg')] bg-no-repeat bg-cover w-[50px] h-[50px] rounded-full"></DropdownMenuTrigger>
                <DropdownMenuContent>
                  {users?.name && (
                    <DropdownMenuLabel className="capitalize">
                      {users.name}{" "}
                    </DropdownMenuLabel>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleLogout()}
                  >
                    <img src={LogoutIcon} className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* DROPDOWN */}
            </div>
          </nav>

          {/* CONTENT */}
          <section className="flex flex-col h-full justify-center gap-8 p-4">
            {/* TEXT */}
            <div className="flex flex-col lg:w-[40%] w-[85%] gap-8">
              <h1 className="text-4xl font-bold text-white drop-shadow-[-1px_1px_0_rgb(0,0,0)]">
                A história da música não pode ser esquecida!
              </h1>
              <span className="text-white drop-shadow-[-1px_1px_0_rgb(0,0,0)]">
                Sucessos que marcaram o tempo!!!
              </span>
            </div>
          </section>
        </main>

        {/* BACKDROP */}
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-[#19181F] to-10%"></div>
      </div>

      {/* SEARCH BAR + ALBUMS */}
      <div className="flex grow items-center justify-center bg-[#19181F]">
        <div className="flex flex-col gap-8 w-full px-4 sm:px-28 xl:px-48 py-4">
          {/* SEARCH BAR */}
          <div className="flex justify-center items-center w-full">
            <form
              onSubmit={handleAlbums}
              className="flex items-center justify-end h-full w-full sm:w-96 relative"
            >
              <input
                name="search"
                type="text"
                className="bg-[#19181F] ring-1 ring-white text-white hover:ring-2 focus:ring-2 w-full focus:outline-none rounded-md p-2 pr-14"
                placeholder="Procure algo..."
              />
              <button
                type="submit"
                className="absolute m-4 cursor-pointer h-8 w-8 bg-[url('./assets/searchIcon.svg')]"
              ></button>
            </form>
          </div>

          {/* ALBUMS */}
          {!isSearchingAlbums ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl text-white">Trends</h1>

              <div className="flex w-full items-center justify-center">
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent className="">
                    {albums?.map((album, i) => (
                      <CarouselItem
                        key={i}
                        className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 "
                      >
                        <div
                          key={i}
                          style={
                            {
                              "--bg-wallpaperAlbum": `url(${album.images[0].url})`,
                            } as React.CSSProperties
                          }
                          className="flex aspect-square w-30 bg-[image:var(--bg-wallpaperAlbum)] bg-center bg-cover bg-no-repeat rounded-md shadow-[0_3px_19px_0_rgba(255,255,255,0.1)]"
                        >
                          <div
                            onClick={() =>
                              handleLink(
                                album.externalUrls.externalUrls.spotify
                              )
                            }
                            className="flex flex-col relative h-full w-full items-center justify-center text-center bg-neutral-950 bg-opacity-50 p-2 rounded-md"
                          >
                            <h1 className="text-lg text-center line-clamp-3 font-semibold uppercase text-white">
                              {album.name}
                            </h1>
                            <span className="absolute bottom-0 right-0 text-lg text-white p-2">
                              R$ {album.value}
                            </span>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          ) : (
            <div className="flex grow w-full h-full flex-wrap items-center justify-center gap-4 rounded-md">
              {albums?.map((album, i) => (
                  <div
                    key={i}
                    style={{ "--bg-backgroundAlbum": `url(${album.images[0].url})`} as React.CSSProperties}
                    className="relative grow basis-1/3 md:basis-1/4 lg:basis-1/5 bg-[image:var(--bg-backgroundAlbum)] bg-cover bg-no-repeat bg-center aspect-square shadow-[0_3px_19px_0_rgba(255,255,255,0.1)] rounded-md"
                    >
                      <div className='flex flex-col items-center justify-center h-full w-full bg-neutral-950 bg-opacity-50 rounded-md'>
                        <div className=" ">
                          <h1 className="text-lg text-center line-clamp-3 font-semibold uppercase text-white">{album.name}</h1>
                          <span className="absolute bottom-0 right-0 text-lg text-white p-2">R$ {album.value}</span>
                        </div>
                      </div>
                    </div>
              ))}
              {/* Card */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
