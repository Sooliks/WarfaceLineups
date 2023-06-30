import {$client, $clientAuth} from "../index";

export const registration = async (login, email, password, remember) => {
    return $client.post('/registration',{login,email,password, remember});
}
export const authorization = async (login, password, remember) => {
    return $client.post('/registration',{login,password,remember});
}
export const checkIsValidJwtToken = async () =>{
    return $client.post('/',{login,password,remember});
}