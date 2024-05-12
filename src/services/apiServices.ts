import axios from "axios";

export const album_api = axios.create({
    baseURL: 'http://localhost:8082/api/albums'
})

export const user_api = axios.create({
    baseURL: 'http://localhost:8081/api/users'
})

export const wallet_api = axios.create({
    baseURL: 'http://localhost:8081/api/wallet'
})