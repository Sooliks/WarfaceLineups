import React, {useEffect, useState} from 'react';
import VideoPreview from "../../../components/VideoPreview";
import {Space} from "antd";
import VideosAPI from "../../../http/api/VideosAPI";

const UnVerifiedVideos = () => {
    const [videos,setVideos] = useState([{}]);
    useEffect(()=>{
        VideosAPI.getUnVerifiedVideos().then(data=>{
            setVideos(data);
        })
    },[])
    return (
        <div>
            <Space direction="horizontal" style={{ display: 'flex',  margin: 12 }} size={[2, 4]} wrap>
                {videos!=null ? videos.map(video=>
                    <VideoPreview video={video} type={"admin"}/>
                ): <p>Здесь пока ничего нету</p>}
            </Space>
        </div>
    );
};

export default UnVerifiedVideos;