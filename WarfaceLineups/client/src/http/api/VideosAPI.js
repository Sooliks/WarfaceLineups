import {$client, $clientAuth} from "../index";


export default class VideosAPI {
    static getVideos = async (page) => {
        const {data} = await $client.post('/videos', {page});
        return data;
    }
}