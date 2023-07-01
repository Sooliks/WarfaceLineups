import {$client, $clientAuth} from "../index";


export default class VideosAPI {
    static getVideos = async (page, filter) => {
        const {data} = await $client.post('/videos', {page,filter});
        return data;
    }
}