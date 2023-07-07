import {$client, $clientAuth} from "../index";





export default class UserAPI {
    static registration = async (login, email, password, remember) => {
        const {data} = await $client.post('/registration', {login, email, password, remember});
        return data;
    }
    static authorization = async (email, password, remember) => {
        const {data} = await $client.post('/authorization', {email, password, remember});
        return data;
    }
    static checkIsValidJwtToken = async (login,jwt) => {
        try {
            const {data} = await $client.post('/authorizationByJwt', {login, jwt});
            return data;
        }catch (e){

        }
    }
    static uploadAvatar = async (form) =>{
        const {data} = await $clientAuth.post('/uploadavatar', form,{ContentType:'multipart/form-data'});
        return data;
    }
    static getVerificationCode = async () =>{
        const {data} = await $clientAuth.get('/getverificationcode');
        return data;
    }
    static uploadVerificationCode = async (verificationCode) =>{
        const {data} = await $clientAuth.post('/uploadverificationcode',{verificationCode});
        return data;
    }
    static changePassword = async (oldpassword) => {
        const {data} = await $clientAuth.post('/changepassword',{oldpassword});
        return data;
    }
    static changePasswordSubmitCode = async (newpassword,code) =>{
        const {data} = await $clientAuth.post('/changepasswordsubmitcode',{newpassword,code});
        return data;
    }


}