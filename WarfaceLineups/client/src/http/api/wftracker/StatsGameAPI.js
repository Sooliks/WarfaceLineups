import {$wfapi} from './index.js'
import axios from "axios";


export default class StatsGameAPI {
    static getOnlineServer = async (region) => {
        try {
            if (region === "ru") {
                const {data} = await axios.get(`https://warface-statistics.firebaseio.com//summary/ru-alpha.json`);
                return data;
            }
            if (region === "eu") {
                const {data} = await axios.get(`https://warface-statistics.firebaseio.com//summary/eu.json`);
                return data;
            }
        }catch (e) {

        }
    }
    static getTop10ClansRu = async () =>{
        try {
            const {data} = await $wfapi.get('/rating/clan');
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