import axios from "axios";

const $client = axios.create({
    baseURL: '/api'
})
const $clientAuth = axios.create({
    baseURL: '/api'
})

const authInterceptor = config =>{
    config.headers.authorization = ``;
    return config;
}
$clientAuth.interceptors.request.use(authInterceptor)
export {
    $client,
    $clientAuth
}