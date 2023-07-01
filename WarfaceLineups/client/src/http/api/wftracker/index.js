import axios, {all} from "axios";
let cors = require('cors')

//app.use(cors()) // Use this after the variable declaration

const $wfapi = axios.create({
    baseURL: 'https://api.warface.ru/',
})
export {
    $wfapi
}