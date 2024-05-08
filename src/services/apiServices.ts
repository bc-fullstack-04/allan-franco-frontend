import axios from "axios";

export const album_api = axios.create({
    baseURL: 'http://localhost:8082/api'
})

export const user_api = axios.create({
    baseURL: 'http://localhost:8081/api'
})