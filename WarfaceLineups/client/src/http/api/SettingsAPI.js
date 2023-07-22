import {$clientAuth} from "../index";



export default class SettingsAPI {
    static changeUrlOnYoutube = async (urlonyoutube) => {
        try {
            const {data} = await $clientAuth.post('/changeurlonyoutube', {urlonyoutube});
            return data;
        }catch (e) {

        }
    }
    static changeUrlOnVk = async (urlonvk) => {
        try {
            const {data} = await $clientAuth.post('/changeurlonvk', {urlonvk});
            return data;
        }catch (e) {

        }
    }
    static changeUrlOnTelegram = async (urlontelegram) => {
        try {
            const {data} = await $clientAuth.post('/changeurlontelegram', {urlontelegram});
            return data;
        }catch (e) {

        }
    }
    static changeMainLineup = async (mainlineupid) => {
        try {
            const {data} = await $clientAuth.post('/changemainlineup', {mainlineupid});
            return data;
        }catch (e) {

        }
    }
}