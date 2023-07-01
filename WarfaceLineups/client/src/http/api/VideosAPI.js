import {$client, $clientAuth} from "../index";


export default class VideosAPI {
    static getVideos = async (page, filter) => {
        const {data} = await $client.post('/videos', {page,filter});
        return data;
    }
    static uploadVideo = async (values) => {
        console.log(values);
        const {data} = await $clientAuth.post('/uploadvideo', {values});
        return data;
    }
}