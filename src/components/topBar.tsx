// SHADCN DROPDOWN MENU
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import Logo from '../assets/logo.svg';
import LogoutIcon from '../assets/logoutIcon.svg';
import HomeIcon from '../assets/homeIcon.svg';

import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';

import LinkWithStyle from "./linkWithStyle";
import LinkWithoutStyle from './linkWithoutStyle';

interface Props {
  userName?: string
  homePage?: boolean
  myAlbumsPage?: boolean
}

export default function topBar({ userName, homePage = true, myAlbumsPage = false }: Props) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
      toast.loading("Saindo...");

      logout().then(() => {
          setTimeout(() => {
              navigate("/", { replace: true });
              toast.success("Logout efetuado com sucesso!");
          }, 2000);
      }).catch(() => {
          toast.error("Erro ao sair. Tente novamente mais tarde!");
      });
  }


  return (
    <>
        <nav className="flex flex-row items-center justify-between w-full bg-white bg-opacity-30 backdrop-blur-sm py-3 px-4 lg:px-16">
            {/* LOGO && TITLE */}
            <div className="flex items-center gap-2">
                <img src={Logo} />
                <h1 className="text-white text-xl">BootPlay</h1>
            </div>

            {homePage ? (
                <div className="flex justify-end w-96 gap-4">
                    <LinkWithStyle path="/sign-in">Entrar</LinkWithStyle>
                    <LinkWithStyle path="/sign-up" color="bg-sky-200" textColor="text-black" hover="hover:bg-sky-100">Inscrever-se</LinkWithStyle>
                </div>
            ) : (
                <div className="flex items-center justify-end w-96 gap-2 sm:gap-8">
                    <LinkWithoutStyle path="/profile/my-albums" textColor="text-white" hover={true}>Meus Discos</LinkWithoutStyle>
                    <LinkWithoutStyle path="" textColor="text-white" hover={true}>Carteira</LinkWithoutStyle>

                    {/* DROPDOWN */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-[url('./assets/logo_profile.jpg')] bg-no-repeat bg-cover w-[50px] h-[50px] rounded-full"></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {userName && (
                                    <DropdownMenuLabel className="capitalize">
                                    {userName}{" "}
                                    </DropdownMenuLabel>
                                )}
                            <DropdownMenuSeparator />
                                {myAlbumsPage && (
                                    <DropdownMenuItem className="cursor-pointer">
                                        <img src={HomeIcon} className="mr-2 h-4 w-4" />
                                        <Link to="/profile">Home</Link>
                                    </DropdownMenuItem>

                                )}
                                <DropdownMenuItem className="cursor-pointer" onClick={() => handleLogout()}>
                                    <img src={LogoutIcon} className="mr-2 h-4 w-4" />
                                    <span>Sair</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    {/* DROPDOWN */}
                </div>
            )}
        </nav>
    </>
  )
}
