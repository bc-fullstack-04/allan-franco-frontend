import { album_api } from "@/services/apiServices";
import { albumModel } from "@/models/albumModel";
import { createContext, useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";

interface AlbumContextModel {
    searchAlbums: (search: string) => Promise<albumModel[]>;
}

interface Props {
    children: React.ReactNode
}

const AlbumContext = createContext({ } as AlbumContextModel);

export const AlbumProvider: React.FC<Props> = ({ children }) => {

    const searchAlbums = useCallback(async(search: string) => {
        album_api.defaults.headers.common.Authorization = localStorage.getItem('@Auth.Token');

        const respAlbum = await album_api.get(`/all?search=${search}`);
        
        if(respAlbum instanceof Error){
            return respAlbum.message;
        }
        return respAlbum.data;
    }, []);

    return (
        <AlbumContext.Provider value={{ searchAlbums }}>{children}</AlbumContext.Provider>
    )
    
}

export const useAlbums = () => useContext(AlbumContext);