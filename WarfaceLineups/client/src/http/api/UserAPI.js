import {$client, $clientAuth} from "../index";
import async from "async";






export default class UserAPI {
    static registration = async (login, email, password) => {
        const {data} = await $client.post('/registration', {login, email, password});
        return data;
    }
    static authorization = async (email, password) => {
        const {data} = await $client.post('/authorization', {email, password});
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
    static recoveryPasswordGetVerificationCode = async (email) =>{
        const {data} = await $client.post('/recoverypassword/getverificationcode',{email});
        return data;
    }
    static recoveryPasswordUploadVerificationCode = async (code,email) =>{
        const {data} = await $client.post('/recoverypassword/uploadverificationcode',{code,email});
        return data;
    }
    static recoveryPasswordUploadNewPassword = async (jwt,login,newpassword) =>{
        const {data} = await $client.post('/recoverypassword/recovery',{jwt,login,newpassword});
        return data;
    }

    static getDataProfileForSettings = async(ownerid,page = 1) =>{
        const {data} = await $client.post('/dataprofileforsettings',{ownerid, page});
        return data;
    }




}