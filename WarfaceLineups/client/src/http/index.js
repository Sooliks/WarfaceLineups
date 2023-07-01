import axios from "axios";
import {cookies} from "../data/Cookie";

const $client = axios.create({
    baseURL: 'http://localhost:5258/api'
})
const $clientAuth = axios.create({
    baseURL: 'http://localhost:5258/api'
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