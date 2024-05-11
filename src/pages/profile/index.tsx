import React, { FormEvent, useEffect, useState } from "react";

import { albumModel } from "@/models/albumModel";
import { userModel } from "@/models/userModel";
import { useAlbums } from "@/context/albumContext";

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


// SHADCN DIALOG / MODAL
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ButtonWithStyle from "@/components/buttonWithStyle";
import TopBar from "@/components/topBar";

export default function index() {
  const [users, setUser] = useState<userModel>();
  const [albums, setAlbums] = useState<albumModel[]>([]);

  const [isSearchingAlbums, setIsSearchingAlbums] = useState(true);

  const { searchAlbums, buyAlbums } = useAlbums();

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

      const formData = new FormData(e.target as HTMLFormElement);
      const objectInput = Object.fromEntries(formData);
      search = JSON.stringify(objectInput.search);
    } else {
      search = "Rock";
    }

    const results = await searchAlbums(search);
    setAlbums(results);
  }

  async function handleBuyAlbums(album: albumModel) {
    await buyAlbums(
      album.name,
      album.id,
      album.artists[0].name,
      album.images[0].url,
      album.value
    )
      .then(() => {
        toast.success("Album comprado");
      })
      .catch(() => {
        toast.error("Album já comprado");
      });
  }

  function handleDate(date: string) {
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  return (
    // MAIN / BODY
    <div className={"flex flex-col min-h-screen"}>
      {/* CONTENT + TOPBAR + HEADER */}
      <div className="flex h-[50vh] relative bg-[url('./assets/background_profile.jpg')] bg-center bg-cover bg-no-repeat">
        {/* BACKDROP */}
        <div className="w-full h-full absolute bg-gradient-to-t from-[#19181F] to-10%"></div>
        {/* MAIN / BODY */}
        <main className="flex flex-col w-full h-full bg-neutral-950 bg-opacity-50">
          {/* TOPBAR */}
          <TopBar homePage={false} userName={users?.name} />

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
      </div>

      {/* SEARCH BAR + ALBUMS */}
      <div className="flex-1 items-center justify-center bg-[#19181F]">
        <div className="flex flex-col gap-8 py-4">
          {/* SEARCH BAR */}
          <div className="flex justify-center items-center w-full px-4">
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
            <div className="flex flex-col gap-4 px-16 sm:px-32 md:px-48 lg:px-60">
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
                        className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                      >
                        <Dialog>
                          <DialogTrigger
                            style={
                              {
                                "--bg-backgroundAlbum": `url(${album.images[0].url})`,
                              } as React.CSSProperties
                            }
                            className="relative flex h-full w-full aspect-square bg-[image:var(--bg-backgroundAlbum)] bg-center bg-cover bg-no-repeat rounded-md shadow-[0_3px_19px_0_rgba(255,255,255,0.1)]"
                          >
                            <div className="relative flex flex-col items-center justify-center h-full w-full bg-neutral-950 bg-opacity-50 rounded-md px-2">
                              <h1 className="text-lg text-center line-clamp-3 font-semibold uppercase text-white">
                                {album.artists[0].name}
                              </h1>
                              <span className="absolute bottom-0 right-0 text-lg text-white p-2">
                                R$ {album.value}
                              </span>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="w-[75%] sm:flex sm:min-w-fit sm:w-full h-auto p-0">
                            {/* IMAGE */}
                            <DialogHeader className="h-full w-full">
                              <img
                                src={album.images[0].url}
                                className="h-full w-full rounded-md"
                              />
                            </DialogHeader>
                            {/* CONTENT */}
                            <DialogHeader className="flex flex-col min-h-full sm:min-w-[40%] items-center justify-between p-4">
                              <DialogTitle className="capitalize">
                                {album.artists[0].name}
                              </DialogTitle>
                              <ul className="flex flex-col w-full py-4 gap-2">
                                <li className="flex flex-col text-start">
                                  <DialogDescription>
                                    <b>Nome do album</b>
                                  </DialogDescription>
                                  <DialogDescription>
                                    {album.name}
                                  </DialogDescription>
                                </li>
                                <li className="flex flex-col text-start">
                                  <DialogDescription>
                                    <b>Data de lançamento</b>
                                  </DialogDescription>
                                  <DialogDescription>
                                    {handleDate(album.releaseDate)}
                                  </DialogDescription>
                                </li>
                                <li className="flex flex-col text-start">
                                  <DialogDescription>
                                    <b>Link do album</b>
                                  </DialogDescription>
                                  <DialogDescription>
                                    <a
                                      className="hover:underline"
                                      target="_blank"
                                      href={
                                        album.externalUrls.externalUrls.spotify
                                      }
                                    >
                                      Clique aqui
                                    </a>
                                  </DialogDescription>
                                </li>
                                <li className="flex flex-col text-start">
                                  <DialogDescription>
                                    <b>Valor</b>
                                  </DialogDescription>
                                  <DialogDescription>
                                    R$ {album.value}
                                  </DialogDescription>
                                </li>
                              </ul>
                              <ButtonWithStyle
                                onClick={() => handleBuyAlbums(album)}
                                disabled={false}
                                bgColor="bg-amber-600 hover:bg-amber-500"
                              >
                                Comprar
                              </ButtonWithStyle>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-4 rounded-md px-4 sm:px-16 md:px-32 lg:px-48">
              {albums?.map((album, i) => (
                <Dialog key={i}>
                  <DialogTrigger
                    style={
                      {
                        "--bg-backgroundAlbum": `url(${album.images[0].url})`,
                      } as React.CSSProperties
                    }
                    className="aspect-square w-full h-full bg-[image:var(--bg-backgroundAlbum)] bg-cover bg-no-repeat bg-center  shadow-[0_3px_19px_0_rgba(255,255,255,0.1)] rounded-md"
                  >
                    <div className="relative flex flex-col items-center justify-center h-full w-full bg-neutral-950 bg-opacity-50 rounded-md px-2">
                      <h1 className="text-lg text-center line-clamp-3 font-semibold uppercase text-white">
                        {album.artists[0].name}
                      </h1>
                      <span className="absolute bottom-0 right-0 text-lg text-white p-2">
                        R$ {album.value}
                      </span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[75%] sm:flex sm:min-w-fit sm:w-full h-auto p-0">
                    {/* IMAGE */}
                    <DialogHeader className="h-full w-full">
                      <img
                        src={album.images[0].url}
                        className="h-full w-full rounded-md"
                      />
                    </DialogHeader>
                    {/* CONTENT */}
                    <DialogHeader className="flex-col sm:min-w-[40%] items-center justify-between p-4">
                      <DialogTitle className="capitalize">
                        {album.artists[0].name}
                      </DialogTitle>
                      <ul className="flex flex-col w-full py-4 gap-2">
                        <li className="flex flex-col text-start">
                          <DialogDescription>
                            <b>Nome do album</b>
                          </DialogDescription>
                          <DialogDescription>{album.name}</DialogDescription>
                        </li>
                        <li className="flex flex-col text-start">
                          <DialogDescription>
                            <b>Data de lançamento</b>
                          </DialogDescription>
                          <DialogDescription>
                            {handleDate(album.releaseDate)}
                          </DialogDescription>
                        </li>
                        <li className="flex flex-col text-start">
                          <DialogDescription>
                            <b>Link do album</b>
                          </DialogDescription>
                          <DialogDescription>
                            <a
                              className="hover:underline"
                              target="_blank"
                              href={album.externalUrls.externalUrls.spotify}
                            >
                              Clique aqui
                            </a>
                          </DialogDescription>
                        </li>
                        <li className="flex flex-col text-start">
                          <DialogDescription>
                            <b>Valor</b>
                          </DialogDescription>
                          <DialogDescription>
                            R$ {album.value}
                          </DialogDescription>
                        </li>
                      </ul>
                      <ButtonWithStyle
                        onClick={() => handleBuyAlbums(album)}
                        disabled={false}
                        bgColor="bg-amber-600 hover:bg-amber-500"
                      >
                        Comprar
                      </ButtonWithStyle>
                      <DialogDescription className="w-full"></DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
