import { album_api } from "@/services/apiServices";
import { albumModel } from "@/models/albumModel";
import { createContext, useCallback, useContext } from "react";

interface AlbumContextModel {
    searchAlbums: (search: string) => Promise<albumModel[]>;
    buyAlbums: (name:string, idSpotify:string, artistName:string, imageUrl:string, value:number) => Promise<String | void>;
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

    const buyAlbums = useCallback(async (name:string, idSpotify:string, artistName:string, imageUrl:string, value:number) => {
        await album_api.post('/sale', {name, idSpotify, artistName, imageUrl, value});
    }, [])

    return (
        <AlbumContext.Provider value={{ searchAlbums, buyAlbums }}>{children}</AlbumContext.Provider>
    )
}

export const useAlbums = () => useContext(AlbumContext);