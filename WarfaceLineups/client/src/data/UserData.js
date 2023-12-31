import {makeAutoObservable} from "mobx";

export default class UserData {
    constructor() {
        this._isAuth = false
        this._user = {
            id: null,
            login: 'Здесь логин',
            email: "Здесь email",
            role: 'member',
            jwt: "",
            isVerifiedAccount: false,
            isPremiumAccount: false
        }
        makeAutoObservable(this);
    }
    setIsAuth(bool){
        this._isAuth = bool;
    }
    setUser(user){
        this._user = user;
    }

    get isAuth(){
        return this._isAuth;
    }
    get user(){
        return this._user;
    }
}