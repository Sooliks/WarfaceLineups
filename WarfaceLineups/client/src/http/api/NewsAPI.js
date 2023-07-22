import {$client, $clientAuth} from "../index";




export default class NewsAPI {
    static publishNews = async (news) => {
        try {
            const {data} = await $clientAuth.post('/publishnews', {news});
            return data;
        }catch (e){

        }
    }
    static getNews = async (filter) => {
        try {
            const {data} = await $client.get(`/news/${filter}`);
            return data;
        }catch (e) {

        }
    }
}