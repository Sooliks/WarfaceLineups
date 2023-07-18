import {$client, $clientAuth} from "../index";



export default class SettingsAPI {
    static changeUrlOnYoutube = async (urlonyoutube) => {
        const {data} = await $clientAuth.post('/changeurlonyoutube', {urlonyoutube});
        return data;
    }
    static changeUrlOnVk = async (urlonvk) => {
        const {data} = await $clientAuth.post('/changeurlonvk', {urlonvk});
        return data;
    }
    static changeUrlOnTelegram = async (urlontelegram) => {
        const {data} = await $clientAuth.post('/changeurlontelegram', {urlontelegram});
        return data;
    }
    static changeMainLineup = async (mainlineupid) => {
        const {data} = await $clientAuth.post('/changemainlineup', {mainlineupid});
        return data;
    }
}