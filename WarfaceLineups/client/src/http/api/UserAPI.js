import {$client, $clientAuth} from "../index";







export default class UserAPI {
    static registration = async (login, email, password) => {
        try {
            const {data} = await $client.post('/registration', {login, email, password});
            return data;
        }catch (e) {

        }
    }
    static authorization = async (email, password) => {
        try {
            const {data} = await $client.post('/authorization', {email, password});
            return data;
        }catch (e) {

        }
    }
    static checkIsValidJwtToken = async (login,jwt) => {
        try {
            const {data} = await $client.post('/authorizationByJwt', {login, jwt});
            return data;
        }catch (e){

        }
    }
    static uploadAvatar = async (form) =>{
        try {
            const {data} = await $clientAuth.post('/uploadavatar', form, {ContentType: 'multipart/form-data'});
            return data;
        }catch (e) {

        }
    }
    static getVerificationCode = async () =>{
        try {
            const {data} = await $clientAuth.get('/getverificationcode');
            return data;
        }catch (e){

        }
    }
    static uploadVerificationCode = async (verificationCode) =>{
        try {
            const {data} = await $clientAuth.post('/uploadverificationcode', {verificationCode});
            return data;
        }catch (e) {

        }
    }
    static changePassword = async (oldpassword) => {
        try {
            const {data} = await $clientAuth.post('/changepassword', {oldpassword});
            return data;
        }catch (e) {

        }
    }
    static changePasswordSubmitCode = async (newpassword,code) =>{
        try {
            const {data} = await $clientAuth.post('/changepasswordsubmitcode', {newpassword, code});
            return data;
        }catch (e) {

        }
    }
    static recoveryPasswordGetVerificationCode = async (email) =>{
        try {
            const {data} = await $client.post('/recoverypassword/getverificationcode', {email});
            return data;
        }catch (e) {

        }
    }
    static recoveryPasswordUploadVerificationCode = async (code,email) =>{
        try {
            const {data} = await $client.post('/recoverypassword/uploadverificationcode', {code, email});
            return data;
        }catch (e) {

        }
    }
    static recoveryPasswordUploadNewPassword = async (jwt,login,newpassword) =>{
        try {
            const {data} = await $client.post('/recoverypassword/recovery', {jwt, login, newpassword});
            return data;
        }catch (e) {

        }
    }
    static getDataProfileForSettings = async(ownerid) =>{
        try {
            const {data} = await $client.post('/dataprofileforsettings', {ownerid});
            return data;
        }catch (e) {

        }
    }
    static getDataProfile = async(ownerid, filter, page) =>{
        try {
            const {data} = await $client.post('/dataprofile', {ownerid, filter, page});
            return data;
        }catch (e) {

        }
    }




}