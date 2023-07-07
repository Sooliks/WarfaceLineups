import axios from "axios";


const $wfapi = axios.create({
    baseURL: 'https://api.wfstats.cf',
    headers: "Access-Control-Allow-Origin"
})
export {
    $wfapi
}