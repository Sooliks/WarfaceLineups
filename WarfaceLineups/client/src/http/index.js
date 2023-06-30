import axios from "axios";

const $client = axios.create({
    baseURL: 'http://localhost:5258/api'
})
const $clientAuth = axios.create({
    baseURL: 'http://localhost:5258/api'
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