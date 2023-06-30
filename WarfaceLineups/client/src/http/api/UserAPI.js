import {$client, $clientAuth} from "../index";


export default class UserAPI {
    static registration = async (login, email, password, remember) => {
        const {data} = await $client.post('/registration', {login, email, password, remember});
        return data;
    }
    static authorization = async (login, password, remember) => {
        const {data} = await $client.post('/authorization', {login, password, remember});
        return data;
    }
    static checkIsValidJwtToken = async () =>{
        const {data} = await $client.post('/authorizationByJwt', {});
        return data;
    }
}