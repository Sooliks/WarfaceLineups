import axios from "axios";
import {cookies} from "../data/cookies";
import {isDevelopmentMode} from "../conf";


const $client = axios.create({
    baseURL: isDevelopmentMode ? 'http://localhost:5258/api' : '/api'
})
const $clientAuth = axios.create({
    baseURL: isDevelopmentMode ? 'http://localhost:5258/api' : '/api'
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