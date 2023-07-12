import React, {useContext, useState} from 'react';
import {Avatar, Button, Card, Space, notification} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {cookiesFromFavorites} from "../../data/cookies";

const VideoForLineups = observer(({video,handleClickOnVideo,handleOnMouseOver,handleOnMouseOut}) => {
    const {user, videosFavorite} = useContext(Context);
    const[isActiveIcon,setIsActiveIcon] = useState(false);
    const handlerClickHeart = () =>{
        if(isActiveIcon)return
        if(cookiesFromFavorites.get('favoritesVideos')==null || cookiesFromFavorites.get('favoritesVideos') === undefined){
            cookiesFromFavorites.set('favoritesVideos', [], {path:'/', maxAge: 86400*360});
        }
        videosFavorite.setVideos(cookiesFromFavorites.get('favoritesVideos'));
        if(videosFavorite.videos?.filter(item => item.id === video.id).length > 0){
            notification.open({
                message: "Уведомление",
                description: "Этот лайнап уже есть в избранном"
            })
            return;
        }
        videosFavorite.setVideos([...videosFavorite?.videos,video]);
        cookiesFromFavorites.set('favoritesVideos', videosFavorite?.videos, {path:'/', maxAge: 86400*360});
        setIsActiveIcon(true);
        notification.open({
            message: "Уведомление",
            description: "Лайнап добавлен в избранное"
        })
    }
    return (
        <Space direction={"vertical"}>
            <Card title={video.title} size="large" style={{maxWidth:500, height: "auto", marginBottom: 12, marginRight: 3, padding: 0}}>
                <img
                    src={video.screenShotsId===0 ? video.urlOnPreview : `http://localhost:5258/api/getlineupscreenshots/${video.id}/0`}
                    alt={video.title}
                    onClick={handleClickOnVideo}
                    onMouseOver={e=>handleOnMouseOver(e)}
                    onMouseOut={e=>handleOnMouseOut(e)}
                    style={{height:202, width:360, border: '2px solid transparent', borderRadius:'6px'}}
                />
                <br/>
                <Space direction={"horizontal"} style={{display:'flex', justifyContent:'space-between'}}>
                    <Space>
                        <Avatar src={`/api/avatar/${video.ownerId}`} alt={video.title}/>
                        <p>{video.ownerLogin}</p>
                    </Space>
                    {user.isAuth && <Button type="dashed" shape="circle" icon={isActiveIcon ? <HeartFilled/> : <HeartOutlined/>} onClick={handlerClickHeart}/>}
                </Space>
            </Card>
        </Space>
    );
});

export default VideoForLineups;