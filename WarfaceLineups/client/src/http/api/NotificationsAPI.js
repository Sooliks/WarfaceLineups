import {$clientAuth} from "../index";




export default class NotificationsAPI {
    static getNotifications = async () => {
        try {
            const {data} = await $clientAuth.post('/getnotifications');
            return data;
        }catch (e) {

        }
    }
    static deleteNotifications = async (id) => {
        try {
            const {data} = await $clientAuth.post('/deletenotify', {id});
            return data;
        }catch (e) {

        }
    }
    static getCountNotificationsOfAccount = async () =>{
        try {
            const {data} = await $clientAuth.post('/getcountnotifications');
            return data;
        }catch (e) {

        }
    }
}