import axios from "axios";


//axios.defaults.headers.common['Accept'] = ['text/plain']
//axios.defaults.withCredentials = true


const $wfapi = axios.create({
    baseURL: 'https://api.warface.ru',
    withCredentials: true,
})


export {
    $wfapi
}