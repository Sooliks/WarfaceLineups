import {$clientAuth} from "../index";




export default class ReportsAPI {
    static addReport = async (lineupId,typeReport) => {
        try {
            const {data} = await $clientAuth.post('/addreport', {lineupId, typeReport});
            return data;
        }catch (e) {

        }
    }
    static getReports = async () => {
        try {
            const {data} = await $clientAuth.get(`/reports`);
            return data;
        }catch (e) {

        }
    }
    static setCompleteReport = async (reportId) => {
        try {
            const {data} = await $clientAuth.post('/setcompletereport', {reportId});
            return data;
        }
        catch (e) {

        }
    }
}