import {$clientAuth, $client} from "../index";




export default class CommentsAPI {
    static addComment = async (idLineup,text) => {
        try {
            const {data} = await $clientAuth.post('/addcomment', {idLineup, text});
            return data;
        }catch (e) {

        }
    }
    static getComments = async (lineupId) => {
        try {
            const {data} = await $client.get(`/comments/${lineupId}`);
            return data;
        }catch (e) {

        }
    }
    static deleteCommentUser = async (idComment) => {
        try {
            const {data} = await $clientAuth.post('/deletecomment/user', {idComment});
            return data;
        }
        catch (e) {

        }
    }
    static deleteCommentAdmin = async (idComment) => {
        try {
            const {data} = await $clientAuth.post('/deletecomment/admin', {idComment});
            return data;
        }
        catch (e) {

        }
    }
}