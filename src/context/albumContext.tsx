import { album_api } from "@/services/apiServices";
import { albumModel } from "@/models/albumModel";
import { exportedAlbumModel } from "@/models/exportedAlbumModel";
import { createContext, useCallback, useContext } from "react";

interface AlbumContextModel {
    searchAlbums: (search: string) => Promise<albumModel[]>;
    buyAlbums: (name:string, idSpotify:string, artistName:string, imageUrl:string, value:number) => Promise<String | void>;
    myAlbums: () => Promise<exportedAlbumModel[]>;
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
        album_api.defaults.headers.common.Authorization = localStorage.getItem('@Auth.Token');
        await album_api.post('/sale', {name, idSpotify, artistName, imageUrl, value});
    }, []);

    const myAlbums = useCallback(async()=>{
        album_api.defaults.headers.common.Authorization = localStorage.getItem('@Auth.Token');
        const response = await album_api.get('/my-collection');
        
        return response.data;
    },[]);

    return (
        <AlbumContext.Provider value={{ searchAlbums, buyAlbums, myAlbums }}>{children}</AlbumContext.Provider>
    )
}

export const useAlbums = () => useContext(AlbumContext);