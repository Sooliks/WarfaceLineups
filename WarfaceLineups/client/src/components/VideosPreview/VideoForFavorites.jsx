import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Card, Space, Typography} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {cookies} from "../../data/cookies";
import {Context} from "../../index";
import {isDevelopmentMode} from "../../conf";
import ModalOtherProfile from "../ModalOtherProfile";
import YouTube from "react-youtube";

const { Link } = Typography;


const VideoForFavorites = ({video,handleClickOnVideo,handleOnMouseOver,handleOnMouseOut}) => {
    const {videosFavorite} = useContext(Context);
    const [isVisibleProfile,setIsVisibleProfile] = useState(false);
    const[isActiveIcon,setIsActiveIcon] = useState(true);
    const handlerClickHeart = () =>{
        videosFavorite.setVideos(cookies.get('favoritesVideos'));
        videosFavorite.setVideos(videosFavorite.videos.filter(v=>v.id !== video.id));
        cookies.set('favoritesVideos',videosFavorite.videos);
        setIsActiveIcon(false);
    }
    const[videoId,setVideoId] = useState('');
    const[isVisibleVideoPreview,setIsVisibleVideoPreview] = useState(false)
    useEffect(()=>{
        setVideoId(video.urlOnVideo?.slice(video.urlOnVideo.lastIndexOf('=') + 1))
    },[])

    return (
        <Space direction={"vertical"}>
            <Card title={video.title} size="large" style={{maxWidth:500, height: "auto", marginBottom: 12, marginRight: 3, padding: 0}}>
                {!isVisibleVideoPreview &&
                    <img
                        src={video.screenShotsId === 0 ? video.urlOnPreview : isDevelopmentMode ? `http://localhost:5258/api/getlineupscreenshots/${video.screenShotsId}/0` : `api/getlineupscreenshots/${video.screenShotsId}/0`}
                        alt={video.title}
                        onClick={handleClickOnVideo}
                        onMouseOver={e => {
                            handleOnMouseOver(e)
                            if(video.screenShotsId === 0) setIsVisibleVideoPreview(true)
                        }}
                        onMouseOut={e => {
                            handleOnMouseOut(e)
                        }}
                        style={{height: 198, width: 345, border: '2px solid transparent', borderRadius: '6px'}}
                    />
                }
                {isVisibleVideoPreview &&
                    <Space onMouseOut={() => setIsVisibleVideoPreview(false)} onClick={handleClickOnVideo}>
                        <YouTube
                            videoId={videoId}
                            opts={{
                                height: 200,
                                width: 347,
                                playerVars: {
                                    autoplay: 1,
                                    disablekb: 1,
                                    controls: 0,
                                    fs: 0,
                                    loop: 0,
                                    modestbranding: 1,
                                    rel: 0,
                                    showinfo: 0,
                                    mute: 1,
                                    autohide: 1,
                                    start: 0,
                                },
                            }}
                            onReady={(e)=>e.target.setPlaybackRate(2.5)}
                            onEnd={(e)=>e.target.playVideo()}
                            onPause={handleClickOnVideo}
                        />
                    </Space>
                }
                <br/>
                <Space direction={"horizontal"} style={{display:'flex', justifyContent:'space-between'}}>
                    <Space>
                        <Avatar src={isDevelopmentMode ? `http://localhost:5258/api/avatar/${video.ownerId}` : `/api/avatar/${video.ownerId}`} alt={video.title}/>
                        <Link onClick={()=>setIsVisibleProfile(true)}>{video.ownerLogin}</Link>
                    </Space>
                    <Button type="dashed" shape="circle" icon={isActiveIcon ? <HeartFilled/> : <HeartOutlined/>} onClick={handlerClickHeart} />
                </Space>
            </Card>
            {isVisibleProfile &&
                <ModalOtherProfile ownerId={video.ownerId} onClose={()=>setIsVisibleProfile(false)}/>
            }
        </Space>
    );
};

export default VideoForFavorites;