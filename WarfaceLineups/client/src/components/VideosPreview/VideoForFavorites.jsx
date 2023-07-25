import React, {useContext, useState} from 'react';
import {Avatar, Button, Card, Space} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {cookies} from "../../data/cookies";
import {Context} from "../../index";
import {isDevelopmentMode} from "../../conf";

const VideoForFavorites = ({video,handleClickOnVideo,handleOnMouseOver,handleOnMouseOut}) => {
    const {videosFavorite} = useContext(Context);
    const[isActiveIcon,setIsActiveIcon] = useState(true);
    const handlerClickHeart = () =>{
        videosFavorite.setVideos(cookies.get('favoritesVideos'));
        videosFavorite.setVideos(videosFavorite.videos.filter(v=>v.id !== video.id));
        cookies.set('favoritesVideos',videosFavorite.videos);
        setIsActiveIcon(false);
    }

    return (
        <Space direction={"vertical"}>
            <Card title={video.title} size="large" style={{maxWidth:500, height: "auto", marginBottom: 12, marginRight: 3, padding: 0}}>
                <img
                    src={video.screenShotsId===0 ? video.urlOnPreview : isDevelopmentMode ? `http://localhost:5258/api/getlineupscreenshots/${video.screenShotsId}/0` : `/api/getlineupscreenshots/${video.screenShotsId}/0`}
                    alt={video.title}
                    onClick={handleClickOnVideo}
                    onMouseOver={e=>handleOnMouseOver(e)}
                    onMouseOut={e=>handleOnMouseOut(e)}
                    style={{height:202, width:360, border: '2px solid transparent', borderRadius:'6px'}}
                />
                <br/>
                <Space direction={"horizontal"} style={{display:'flex', justifyContent:'space-between'}}>
                    <Space>
                        <Avatar src={isDevelopmentMode ? `http://localhost:5258/api/avatar/${video.ownerId}` : `/api/avatar/${video.ownerId}`} alt={video.title}/>
                        <p>{video.ownerLogin}</p>
                    </Space>
                    <Button type="dashed" shape="circle" icon={isActiveIcon ? <HeartFilled/> : <HeartOutlined/>} onClick={handlerClickHeart} />
                </Space>
            </Card>
        </Space>
    );
};

export default VideoForFavorites;