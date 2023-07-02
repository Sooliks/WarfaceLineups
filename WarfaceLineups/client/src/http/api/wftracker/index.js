import axios from "axios";


const $wfapi = axios.create({
    baseURL: 'https://api.wfstats.cf',
})
export {
    $wfapi
}