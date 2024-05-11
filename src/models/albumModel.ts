export class albumModel{
    albumType: string
    artists: Artists[]
    externalUrls: ExternalUrls
    id: string
    images: Image[]
    name: string
    releaseDate: string
    type: string
    value: number
}

type Artists = {
    externalUrls: ExternalUrls
    href: string
    id: string
    name: string
    type: string
    url: string
}

type ExternalUrls = {
    externalUrls: _ExternalUrls
}

type _ExternalUrls = {
    spotify: string
}

type Image = {
    height: number
    width: number
    url: string
}