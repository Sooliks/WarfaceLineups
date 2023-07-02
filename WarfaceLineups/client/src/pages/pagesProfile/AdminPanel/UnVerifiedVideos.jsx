import React, {useEffect, useState} from 'react';
import VideoPreview from "../../../components/VideoPreview";
import {Space, Spin} from "antd";
import VideosAPI from "../../../http/api/VideosAPI";

const UnVerifiedVideos = () => {
    const[loading, setLoading] = useState(true);
    const [videos,setVideos] = useState([{}]);
    useEffect(()=>{
        VideosAPI.getUnVerifiedVideos().then(data=>{
            setVideos(data);
            setLoading(false)
        })
    },[])
    if(loading)return <Spin size="large"/>

    return (
        <div>
            <Space direction="horizontal" style={{ display: 'flex',  margin: 12 }} size={[2, 4]} wrap>
                {videos.length > 0 ? videos.map(video=>
                    <VideoPreview video={video} type={"admin"}/>
                ): <h3>Не одно видео пока не загрузили</h3>}
            </Space>
        </div>
    );
};

export default UnVerifiedVideos;