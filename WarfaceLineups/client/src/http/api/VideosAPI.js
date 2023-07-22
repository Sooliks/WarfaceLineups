import {$client, $clientAuth} from "../index";



export default class VideosAPI {
    static getVideos = async (page, filter) => {
        try {
            const {data} = await $client.post('/videos', {page, filter});
            return data;
        }catch (e) {

        }
    }
    static getVideosById = async (page, filter) =>{
        try {
            const {data} = await $clientAuth.post('/getvideosbyownerid', {page, filter});
            return data;
        }catch (e) {

        }
    }
    static uploadVideo = async (values) => {
        try {
            const {data} = await $clientAuth.post('/uploadvideo', {values});
            return data;
        }catch (e) {

        }
    }
    static uploadLineupWithScreenshots = async (values) =>{
        try {
            const {data} = await $clientAuth.post('/uploadlineupwithscreenshots', values);
            return data;
        }catch (e) {

        }
    }
    static getUnVerifiedVideos = async () => {
        try {
            const {data} = await $clientAuth.get('/getvideosunverified');
            return data;
        }catch (e) {

        }
    }
    static getCountVideos = async (filter) => {
        try {
            const {data} = await $client.post('/getcountvideos', {filter});
            return data;
        }catch (e) {

        }
    }
    static getCountVideosByOwnerId = async (filter) => {
        try {
            const {data} = await $clientAuth.post('/getcountvideosbyownerid', {filter});
            return data;
        }catch (e) {

        }
    }
    static deleteVideo = async  (id) => {
        try {
            const {data} = await $clientAuth.post('/deletevideo', {id});
            return data;
        }catch (e) {

        }
    }
    static publishVideo = async  (id) => {
        try {
            const {data} = await $clientAuth.post('/publishvideo', {id});
            return data;
        }catch (e) {

        }
    }
    static getLineupById = async (id) => {
        try {
            const {data} = await $client.get(`/getlineupbyid/${id}`);
            return data;
        }catch (e) {

        }
    }
}