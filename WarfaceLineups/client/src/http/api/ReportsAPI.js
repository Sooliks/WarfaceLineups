import {$client, $clientAuth} from "../index";




export default class ReportsAPI {
    static addReport = async (lineupId,typeReport) => {
        const {data} = await $clientAuth.post('/addreport', {lineupId, typeReport});
        return data;
    }
    static getReports = async () => {
        const {data} = await $clientAuth.get(`/reports`);
        return data;
    }
    static setCompleteReport = async (reportId) => {
        const {data} = await $clientAuth.post('/setcompletereport',{reportId});
        return data;
    }
}