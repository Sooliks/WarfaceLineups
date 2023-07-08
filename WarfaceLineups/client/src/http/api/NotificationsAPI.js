import {$clientAuth} from "../index";




export default class NotificationsAPI {
    static getNotifications = async () => {
        const {data} = await $clientAuth.post('/getnotifications');
        return data;
    }
    static deleteNotifications = async (id) => {
        const {data} = await $clientAuth.post('/deletenotify',{id});
        return data;
    }
}