

import {makeAutoObservable} from "mobx";


export default class FavoritesData {
    constructor() {
        this._vide = [];
        makeAutoObservable(this);
    }
    get videos(){
        return this._vide;
    }
    setVideos(videos){
        this._vide = videos;
    }
}
