import {$wfapi} from './index.js'


export default class StatsAPI {
    static getStatsPlayer = async (nickname) => {
        try {
            const {data} = await $wfapi.get(`player/stats?nickname=${nickname}&server=ru`);
            return data;
        }catch (e) {
            
        }
    }
}