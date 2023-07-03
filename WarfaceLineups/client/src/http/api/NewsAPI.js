import {$client, $clientAuth} from "../index";




export default class UserAPI {
    static publishNews = async (news) => {
        const {data} = await $clientAuth.post('/publishnews', {news});
        return data;
    }
}