import {cookies} from "./index";
import videos from "../../pages/pagesProfile/Videos";


export default class CookieFavorites {
    constructor() {

    }
    static vide = [
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, typeFeature:0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
    ];
    static AddVideo = async (video) => {
        this.vide = cookies.get('favoritesVideos');
        this.vide = [...this.vide,video];
        cookies.set('favoritesVideos',this.vide);
    }
    static DeleteVideo = async (id) =>{
        this.vide = cookies.get('favoritesVideos');
        this.vide = this.vide.filter(v=>v.id !== id)
        cookies.set('favoritesVideos',this.vide);
    }
    static GetFavoritesVideos = async () =>{
        return cookies.get('favoritesVideos');
    }

}