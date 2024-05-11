import React, { FormEvent, useEffect, useState } from "react";

import { albumModel } from "@/models/albumModel";
import { exportedAlbumModel } from "@/models/exportedAlbumModel";
import { userModel } from "@/models/userModel";

import { useAuth } from "@/context/authContext";
import { useAlbums } from "@/context/albumContext";

import LinkWithoutStyle from "@/components/linkWithoutStyle";
import Logo from "@/components/logo";

import LogoutIcon from "@/assets/logoutIcon.svg";
import HomeIcon from "@/assets/homeIcon.svg";
import TotalAlbumsIcon from "@/assets/totalAlbumsIcon.svg";
import ValueInvested from "@/assets/valueInvested.svg";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


// SHADCN DROPDOWN MENU
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cards from "@/components/myAlbums/cards";

export default function index() {
    const [users, setUser] = useState<userModel>();
    const [albums, setAlbums] = useState<exportedAlbumModel[]>();

    const { logout } = useAuth();
    const { myAlbums } = useAlbums();
    const navigate = useNavigate();

    useEffect(()=>{
        const userStorageData = localStorage.getItem("@Auth.Data");
        setUser(userStorageData != null ? JSON.parse(userStorageData) : null);
        handleMyAlbums();
    }, []);

    async function handleMyAlbums(){
        await myAlbums().then((response)=>{
            setAlbums(response);
        }).catch(()=>{
            toast.error('Falha no recebimento dos seus albums')
        });
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

    function handleCountAlbums(){
        if(albums){
            return JSON.stringify(albums.length);
        }
        return "0";
    }

    function handleCountAlbumsPrice(){
        if(albums){
            return albums.reduce((total, album) => total + album.value, 0);
        }
        return "00.00"
    }

    return (
    <div className={"flex flex-col min-h-screen"}>
        {/* MAIN / BODY */}
        <main className="flex flex-col min-h-screen bg-[#19181F] gap-8">
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
                    >
                    <img src={HomeIcon} className="mr-2 h-4 w-4" />
                    <Link to="/profile">Home</Link>
                    </DropdownMenuItem>
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
            <section className="flex flex-col h-full items-start justify-center pt-20 px-4 sm:px-28 gap-8">
                {/* CARD */}
                <h1 className="text-4xl font-bold text-white drop-shadow-[-1px_1px_0_rgb(0,0,0)]">Meus discos</h1>
                <div className="flex flex-col sm:flex-row w-full gap-4">
                    <Cards title="Total de Albums" content={handleCountAlbums()} img={TotalAlbumsIcon} />
                    <Cards title="Valor Investido" content={`R$ ${handleCountAlbumsPrice()}`} img={ValueInvested} />
                </div>
            </section>

            {/* ALBUMS */}
            <section className="flex-1 w-full px-4 sm:px-16 md:px-28 pb-8">
                <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-4 rounded-md">
                    {albums?.map((album, i) => (
                        <div
                            key={i}
                            style={{"--bg-backgroundAlbum": `url(${album.imageUrl})`,} as React.CSSProperties}
                            className="aspect-square bg-[image:var(--bg-backgroundAlbum)] bg-cover bg-no-repeat bg-center shadow-[0_3px_19px_0_rgba(255,255,255,0.1)] rounded-md"
                        >
                            <div className="relative flex flex-col items-center justify-center h-full w-full bg-neutral-950 bg-opacity-50 rounded-md px-2">
                            <h1 className="text-lg text-center line-clamp-3 font-semibold uppercase text-white">
                                {album.artistName}
                            </h1>
                            <span className="absolute bottom-0 right-0 text-lg text-white p-2">
                                R$ {album.value}
                            </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    </div>
    )
}
