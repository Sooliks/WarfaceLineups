import React, {useEffect, useState} from 'react';
import {Card, Space} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {isDevelopmentMode} from "../../conf";
import YouTube from "react-youtube";

const VideoForProfile = ({video,handleClickOnVideo,handleOnMouseOver,handleOnMouseOut, videoPreview = true}) => {
    const[isVisibleVideoPreview,setIsVisibleVideoPreview] = useState(false)
    const[videoId,setVideoId] = useState('');
    useEffect(()=>{
        setVideoId(video.urlOnVideo?.slice(video.urlOnVideo.lastIndexOf('=') + 1))
    },[])
    return (
        <Space direction={"vertical"}>
            <Card title={video.title} size="large" style={{maxWidth:500, height: 346, marginBottom: 12, marginRight: 3, padding: 0}}>
                {!isVisibleVideoPreview &&
                    <img
                        src={video.screenShotsId === 0 ? video.urlOnPreview : isDevelopmentMode ? `http://localhost:5258/api/getlineupscreenshots/${video.screenShotsId}/0` : `api/getlineupscreenshots/${video.screenShotsId}/0`}
                        alt={video.title}
                        onClick={handleClickOnVideo}
                        onMouseOver={e => {
                            handleOnMouseOver(e)
                            if(!videoPreview)return

                            if(video.screenShotsId === 0) setIsVisibleVideoPreview(true)
                        }}
                        onMouseOut={e => {
                            handleOnMouseOut(e)
                        }}
                        style={{height: 198, width: 342, border: '2px solid transparent', borderRadius: '6px'}}
                    />
                }
                {isVisibleVideoPreview &&
                    <Space onMouseOut={() => setIsVisibleVideoPreview(false)} onClick={handleClickOnVideo}>
                        <YouTube
                            videoId={videoId}
                            opts={{
                                height: 200,
                                width: 344,
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
                                    start: 15,
                                },
                            }}
                            onReady={(e)=>{
                                e.target.setPlaybackRate(2.5);
                                e.target.seekTo(15);
                            }}
                            onEnd={(e)=>e.target.playVideo()}
                            onPause={handleClickOnVideo}
                        />
                    </Space>
                }
                <br/>
                <Space direction={"horizontal"} style={{display:'flex', justifyContent:'space-between'}}>
                    <Space>
                        {!video.isVerified &&
                            <Space>
                                <LoadingOutlined />
                                <p>Lineup на проверке</p>
                            </Space>
                        }
                    </Space>
                </Space>
            </Card>
        </Space>
    );
};

export default VideoForProfile;