import {$wfapi} from './index.js'


export default class StatsAPI {
    static getStatsPlayer = async (nickname) => {
        const {data} = await $wfapi.get(``);
        return data;
    }
}