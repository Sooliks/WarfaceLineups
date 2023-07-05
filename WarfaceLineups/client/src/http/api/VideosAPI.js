import {$client, $clientAuth} from "../index";
import async from "async";
import filter from "../../components/Filter";


export default class VideosAPI {
    static getVideos = async (page, filter) => {
        const {data} = await $client.post('/videos', {page,filter});
        return data;
    }
    static getVideosById = async (page, filter) =>{
        const {data} = await $clientAuth.post('/getvideosbyownerid', {page,filter});
        return data;
    }
    static uploadVideo = async (values) => {
        const {data} = await $clientAuth.post('/uploadvideo', {values});
        return data;
    }
    static getUnVerifiedVideos = async () => {
        const {data} = await $clientAuth.get('/getvideosunverified');
        return data;
    }
    static getCountVideos = async (filter) =>{
        const {data} = await $client.post('/getcountvideos',{filter});
        return data;
    }
    static getCountVideosByOwnerId = async (filter) =>{
        const {data} = await $clientAuth.post('/getcountvideosbyownerid',{filter});
        return data;
    }

    static deleteVideo = async  (id) =>{
        const {data} = await $clientAuth.post('/deletevideo',{id});
        return data;
    }
    static publishVideo = async  (id) =>{
        const {data} = await $clientAuth.post('/publishvideo',{id});
        return data;
    }

}