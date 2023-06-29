import React from 'react';
import {Avatar, Card, Space} from "antd";

const VideoPreview = ({video}) => {
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
            <Space direction={"vertical"}>
                <Card title={video.title} size="large" style={{maxWidth:500, height: "auto", marginBottom: 12, marginRight: 3, padding: 0}}>
                    <img
                        src={video.urlOnPreview}
                        alt={video.title}
                        onClick={handleClickOnVideo}
                        onMouseOver={e=>handleOnMouseOver(e)}
                        onMouseOut={e=>handleOnMouseOut(e)}
                        style={{height:202, width:360, border: '2px solid transparent', borderRadius:'6px'}}
                    />
                    <br/>
                    <Space direction={"horizontal"}>
                        <Avatar src={video.urlOnPreview} alt={video.title}/>
                        <p>{video.ownerId}</p>
                    </Space>
                </Card>
            </Space>
        </div>
    );
};

export default VideoPreview;