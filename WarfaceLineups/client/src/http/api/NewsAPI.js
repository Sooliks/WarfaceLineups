import {$client, $clientAuth} from "../index";




export default class NewsAPI {
    static publishNews = async (news) => {
        const {data} = await $clientAuth.post('/publishnews', {news});
        return data;
    }
    static getNews = async (filter) => {
        const {data} = await $client.get(`/news/${filter}`);
        return data;
    }
}