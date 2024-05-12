import { walletModel } from "@/models/walletModel";
import { wallet_api } from "@/services/apiServices";
import { createContext, useCallback, useContext } from "react";

interface WalletContextModel {
    myWallet: () => Promise<walletModel>;
    addCreditToWallet: (value: number) => Promise<void>;
}

interface Props {
    children: React.ReactNode
}

const WalletContext = createContext({ } as WalletContextModel);

export const WalletProvider: React.FC<Props> = ({ children }) => {

    const myWallet = useCallback(async()=>{
        wallet_api.defaults.headers.common.Authorization = localStorage.getItem('@Auth.Token');

        const response = await wallet_api.get('');
        
        return response.data;
    },[]);

    const addCreditToWallet = useCallback(async(value: number)=>{
        wallet_api.defaults.headers.common.Authorization = localStorage.getItem('@Auth.Token');

        await wallet_api.post(`/credit/${value}`);
    }, [])

    return (
        <WalletContext.Provider value={{ myWallet, addCreditToWallet }}>{children}</WalletContext.Provider>
    )
}

export const useWallet = () => useContext(WalletContext);