import axios from "axios";
import {cookies} from "../data/cookies";


const $client = axios.create({
    baseURL: '/api'
})
const $clientAuth = axios.create({
    baseURL: '/api'
})

const authInterceptor = config =>{
    config.headers.authorization = `${cookies.get('jwt')}`;
    config.headers.login = `${cookies.get('login')}`
    return config;
}
$clientAuth.interceptors.request.use(authInterceptor)
export {
    $client,
    $clientAuth
}