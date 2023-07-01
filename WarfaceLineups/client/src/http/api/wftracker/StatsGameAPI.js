import {$wfapi} from './index.js'


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
    static getTop100ClansRu = async () =>{
        const {data} = await $wfapi.get(`/rating/clan/`);
        return data;
    }
}