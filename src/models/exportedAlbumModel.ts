export class exportedAlbumModel{
    name: string
    idSpotify: string
    artistName: string
    imageUrl: string
    value: number
    user: Users[]
}

type Users = {
    id: number
    email: string
    password: string
}