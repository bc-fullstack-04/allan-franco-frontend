import { useEffect, useRef, useState } from "react";

import { userModel } from "@/models/userModel";
import { walletModel } from "@/models/walletModel";

import { useWallet } from "@/context/walletContext";

import Points from "@/assets/pointsIcon.svg";
import ValueInvested from "@/assets/valueInvested.svg";

import toast from "react-hot-toast";

import Cards from "@/components/cards";
import TopBar from "@/components/topBar";
import ButtonWithStyle from "@/components/buttonWithStyle";


export default function index() {
    const [users, setUser] = useState<userModel>();
    const [wallet, setWallet] = useState<walletModel>();

    const { myWallet, addCreditToWallet } = useWallet();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        const userStorageData = localStorage.getItem("@Auth.Data");
        setUser(userStorageData != null ? JSON.parse(userStorageData) : null);
        handleMyWallet();
    }, []);

    async function handleMyWallet(){
        await myWallet().then((response)=>{
            setWallet(response);
        }).catch(()=>{
            toast.error('Falha em receber os dados da carteira')
        });
    }

    async function handleAddCredit(){
        if (inputRef.current) {
            const inputValue = inputRef.current.value;
            const credit = parseFloat(inputValue);
            
            await addCreditToWallet(credit).then(()=>{
                window.location.reload();
            }).catch(()=>{
                toast.error('Falha ao creditar o valor');
            })
        }

    }

    return (
    <div className={"flex flex-col min-h-screen"}>
        {/* MAIN / BODY */}
        <main className="flex flex-col min-h-screen bg-[#19181F] gap-8">
            {/* TOPBAR */}
            <TopBar userName={users?.name} homePage={false} myAlbumsPage={true} />

            {/* CONTENT */}
            <section className="flex flex-col lg:flex-row h-full w-full items-center justify-center pt-20 gap-20">
                {/* CARD */}
                <div className="flex flex-col gap-8">
                    <h1 className="text-4xl font-bold text-white drop-shadow-[-1px_1px_0_rgb(0,0,0)]">Minha carteira</h1>
                    <div className="flex flex-col sm:flex-row w-full gap-4">
                        <Cards title="Valor atual" content={`R$ ${wallet?.balance}`} img={ValueInvested} />
                        <Cards title="Total de pontos" content={JSON.stringify(wallet?.points)} img={Points} />
                    </div>
                </div>

                {/* ADD VALUE */}
                <div className="flex flex-col gap-8 px-14">
                    <h1 className="text-4xl font-bold text-white drop-shadow-[-1px_1px_0_rgb(0,0,0)]">Adicionar valor a carteira</h1>
                    <div className='flex w-full sm:w-fit p-6 bg-white rounded-md'>
                        <div className='flex flex-col sm:flex-row w-full h-full items-center justify-center gap-4'>
                            <div className="flex items-center w-full sm:min-w-fit h-full">
                                <input 
                                    className="bg-zinc-50 w-full ring-1 ring-zinc-300 text-zinc-800 focus:ring-zinc-400 focus:outline-none h-8 p-2 rounded-md"
                                    type="number"
                                    ref={inputRef}
                                    placeholder="Adicionar valor aqui"
                                />
                            </div>
                            <div className="flex items-center w-full sm:w-fit h-full min-w-44">
                                <ButtonWithStyle onClick={() => handleAddCredit()} disabled={false} bgColor="bg-amber-600 hover:bg-amber-500">
                                    Transfeir
                                </ButtonWithStyle>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
    )
}
