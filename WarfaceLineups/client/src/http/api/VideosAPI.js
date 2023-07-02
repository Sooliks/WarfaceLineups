import {$client, $clientAuth} from "../index";


export default class VideosAPI {
    static getVideos = async (page, filter) => {
        const {data} = await $client.post('/videos', {page,filter});
        return data;
    }
    static getVideosById = async (page) =>{
        const {data} = await $clientAuth.post('/getvideosbyid', {page});
        return data;
    }
    static uploadVideo = async (values) => {
        const {data} = await $clientAuth.post('/uploadvideo', {values});
        return data;
    }
}