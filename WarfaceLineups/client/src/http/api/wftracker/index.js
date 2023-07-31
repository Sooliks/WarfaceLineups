import axios from "axios";


axios.defaults.headers.common['Accept'] = ['text/html']
//axios.defaults.headers.common['Origin'] = null

const $wfapi = axios.create({
    baseURL: 'http://api.warface.ru',
    //baseURL: 'https://api.wfstats.cf',
    headers: {
        "Content-Type" : "text/html"
    },
})
/*const wfApiInterceptor = config =>{
    config.headers = {
        'Content-Type' : 'text/html'
    };
    return config;
}
$wfapi.interceptors.request.use(wfApiInterceptor)*/

export {
    $wfapi
}