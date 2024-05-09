import { user_api, album_api } from "@/services/apiServices";
import { userModel } from "@/models/userModel";
import { createContext, useCallback, useContext, useState } from "react";

interface AuthContextModel extends userModel {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void>;
    logout: () => Promise<void>;
}

interface Props {
    children: React.ReactNode
}


export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [userData, setUserData] = useState<userModel>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
        localStorage.setItem('@Auth.Token', `Basic ${respAuth.data.token}`);
        setIsAuthenticated(true)
    }, []);

    const Logout = useCallback(async () => {
        localStorage.removeItem('@Auth.Data');
        localStorage.removeItem('@Auth.Token');
        setUserData(undefined);
        setIsAuthenticated(false);
        user_api.defaults.headers.common.Authorization = null;
        album_api.defaults.headers.common.Authorization = null;
    }, []);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated: !! userData, ...userData, login: Login, logout: Logout}}>{children}</AuthContext.Provider>
    )
}

const AuthContext = createContext({} as AuthContextModel);

export const useAuth = () => useContext(AuthContext);