import { user_api } from "@/services/apiServices";
import { UserModel } from "@/models/userModel";
import { createContext, useCallback, useContext, useState } from "react";

interface AuthContextModel extends UserModel {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void>;
    logout: () => Promise<void>;
}

interface Props {
    children: React.ReactNode
}


export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [userData, setUserData] = useState<UserModel>();

    const Login = useCallback(async (email: string, password: string) => {
        const respAuth = await user_api.post('/users/auth', {email, password});
        
        if(respAuth instanceof Error){
            return respAuth.message;
        }
        
        user_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
        const respUserInfo = await user_api.get(`users/${respAuth.data.id}`);

        if(respUserInfo instanceof Error){
            return respUserInfo.message;
        }
        
        setUserData(respUserInfo.data);

        localStorage.setItem('@Auth.Data', JSON.stringify(respUserInfo.data));
    }, []);

    const Logout = useCallback(async () => {
        localStorage.removeItem('@Auth.Data');
        setUserData(undefined);
    }, []);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated: !! userData, ...userData, login: Login, logout: Logout}}>{children}</AuthContext.Provider>
    )
}

const AuthContext = createContext({} as AuthContextModel);

export const useAuth = () => useContext(AuthContext);