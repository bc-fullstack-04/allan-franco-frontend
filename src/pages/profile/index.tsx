import React, { useEffect, useState } from "react";

import { album_api } from '@/services/apiServices';

import LinkWithoutStyle from "@/components/linkWithoutStyle";
import Logo from "@/components/logo";
import SearchIcon from "@/assets/searchIcon.svg";
import { albumModel } from "@/models/albumModel";

// SHADCN CAROUSEL
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function index() {
  const [albums, setAlbums] = useState<albumModel[]>([]);

  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  useEffect(() => {
    album_api.defaults.headers.common.Authorization = "Basic dGVzdDokMmEkMTAkRUJmVThDSmx2SVNDZ2thYS5td1hFdUYydWJvRDZON29peXNOS0xaSy5IcWI0ZVg1LnIzLzI";
    album_api.get("albums/all?search=Rock")
      .then(resp => {
          setAlbums(resp.data);
    })
  }, []);

  function handleLink(url: string) {
    window.open(url, '_blank');
  }

  return (
    // MAIN / BODY
    <div className="flex flex-col h-screen w-screen">
      {/* CONTENT + TOPBAR + HEADER */}
      <div className="flex w-full h-[150%] bg-[url('./assets/background_profile.jpg')] bg-center bg-cover bg-no-repeat">
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
              <button className="bg-[url('./assets/logo_profile.jpg')] bg-no-repeat bg-cover w-[50px] h-[50px] rounded-full"></button>
            </div>
          </nav>

          {/* CONTENT */}
          <section className="flex flex-col h-full justify-center gap-8 p-8">
            {/* TEXT */}
            <div className="flex flex-col xl:w-[40%] 75% gap-8">
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
      <div className="flex justify-center -mt-20 w-full h-full bg-gradient-to-t from-[#19181F] from-90%">
        <div className="flex flex-col justify-center gap-8 w-[85%] sm:w-[70%] px-16 py-4">
        
          {/* SEARCH BAR */}
          <div className="flex justify-center items-center w-full md:mt-10">
            <div className="flex items-center justify-end h-full">
              <input
                type="text"
                className="bg-[#19181F] ring-1 ring-white text-white hover:ring-2 focus:ring-2 focus:outline-none rounded-md w-96 p-2 pr-14"
                placeholder="Procure algo..."
              />
              <img src={SearchIcon} className="absolute p-4"></img>
            </div>
          </div>

          {/* ALBUMS */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl text-white">Trends</h1>
            {/* CAROUSEL */}
            <div className="flex w-full items-center justify-center">
              <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="">
                  { albums?.map((album, i) => (
                    <CarouselItem key={i} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                      <div
                          key={i}
                          style={{'--bg-wallpaperAlbum': `url(${album.images[0].url})`} as React.CSSProperties}
                          className='flex aspect-square w-30 bg-[image:var(--bg-wallpaperAlbum)] bg-center bg-cover bg-no-repeat rounded-md shadow-[0_3px_19px_0_rgba(255,255,255,0.1)]'
                      >
                        <div onClick={() => handleLink(album.externalUrls.externalUrls.spotify)} className='flex h-full w-full items-center justify-center bg-neutral-950 bg-opacity-30 p-2'>
                            <h1 className="text-lg lg:text-2xl font-semibold uppercase text-center text-white">{album.name}</h1>
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
        </div>
      </div>
    </div>
  );
}
