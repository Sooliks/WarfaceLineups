import React, {useState} from 'react';
import {Avatar, Button, Card, Space} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import VideoForLineups from "./VideosPreview/VideoForLineups";
import VideoForProfile from "./VideosPreview/VideoForProfile";
import VideoForFavorites from "./VideosPreview/VideoForFavorites";


const VideoPreview = ({video, type}) => {
    const[currentIconHeart,setCurrentIconHeart] = useState(<HeartFilled/>);
    const handleClickOnVideo = () =>{

    }
    const handleOnMouseOver = (e) =>{
        e.target.style.borderColor="rgb(63,65,70)";
    }
    const handleOnMouseOut = (e) =>{
        e.target.style.borderColor="#303030";
    }

    return (
        <div>
            <div>
                {type === "default" &&
                    <VideoForLineups video={video} handleClickOnVideo={handleClickOnVideo} handleOnMouseOver={handleOnMouseOver} handleOnMouseOut={handleOnMouseOut}/>
                }
            </div>
            <div>
                {type === "favorites" &&
                    <VideoForFavorites video={video} handleClickOnVideo={handleClickOnVideo} handleOnMouseOver={handleOnMouseOver} handleOnMouseOut={handleOnMouseOut}/>
                }
            </div>
            <div>
                {type === "uservideo" &&
                    <VideoForProfile video={video} handleClickOnVideo={handleClickOnVideo} handleOnMouseOver={handleOnMouseOver} handleOnMouseOut={handleOnMouseOut}/>
                }
            </div>
        </div>
    );
};

export default VideoPreview;