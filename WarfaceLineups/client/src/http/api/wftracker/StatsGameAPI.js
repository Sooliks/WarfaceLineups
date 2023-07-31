import {$wfapi} from './index.js'



export default class StatsGameAPI {
    static getOnlineServer = async (region) => {
        try {
            if (region === "ru") {
                const {data} = await $wfapi.get(`https://warface-statistics.firebaseio.com//summary/ru-alpha.json`);
                return data;
            }
            if (region === "eu") {
                const {data} = await $wfapi.get(`https://warface-statistics.firebaseio.com//summary/eu.json`);
                return data;
            }
        }catch (e) {

        }
    }
    static getTop10ClansRu = async () =>{
        try {
            const {data} = await $wfapi.get('/rating/clan');
            //const {data} = await $wfapi.get('/top10/ru');
            return data;
        }catch (e) {
            
        }
    }
    static getClanMembers = async (name) =>{
        try {
            const {data} = await $wfapi.get(`/clan/members?name=${name}&server=ru`);
            return data;
        }catch (e) {
            
        }
    }
}