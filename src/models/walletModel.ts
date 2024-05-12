export interface walletModel{
    id?: number
    balance?: number
    points?: number
    lastUpdate?: string
    user?: Users[]
}

type Users = {
    id?: number
    name?: string
    email?: string
    password?: string
}