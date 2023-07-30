import {$client, $clientAuth} from "../index";
import JwtService from "../../utils/JwtService";




export default class AimTrackingAPI {
    static uploadScore = async (_score) => {
        try {
            const score = JwtService.generateToken(_score);
            const {data} = await $clientAuth.post('/uploadscore', {score});
            return data;
        }catch (e){

        }
    }
    static getRating = async () => {
        try {
            const {data} = await $client.get(`/rating`);
            return data;
        }catch (e) {

        }
    }
}