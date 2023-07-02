import {$wfapi} from './index.js'
import async from "async";


export default class StatsGameAPI {
    static getOnlineServer = async (region) => {
        if(region==="ru"){
            const {data} = await $wfapi.get(`https://warface-statistics.firebaseio.com//summary/ru-alpha.json`);
            return data;
        }
        if(region==="eu"){
            const {data} = await $wfapi.get(`https://warface-statistics.firebaseio.com//summary/eu.json`);
            return data;
        }
    }
    static getTop10ClansRu = async () =>{
        const {data} = await $wfapi.get(`/top10/ru`);
        return data;
    }
    static getClanMembers = async (name) =>{
        const {data} = await $wfapi.get(`/clan/members?name=${name}&server=ru`);
        return data;
    }
}