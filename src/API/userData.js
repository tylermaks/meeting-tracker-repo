import axios from "axios"
const BASE_URL = "https://golden-pastelito-f5afa8.netlify.app/.netlify/functions"

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})