import {makeAutoObservable} from "mobx";

export default class NavData {
    constructor() {
        this._nav = null

        makeAutoObservable(this);
    }
    setNav(current){
        this._nav = current;
    }


    get nav(){
        return this._nav;
    }

}