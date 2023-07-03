import {$client, $clientAuth} from "../index";




export default class NewsAPI {
    static publishNews = async (news) => {
        const {data} = await $clientAuth.post('/publishnews', {news});
        return data;
    }
}