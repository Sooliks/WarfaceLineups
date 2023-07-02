import React from 'react';
import {Avatar, Button, Card, Space} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

const VideoForAdminPanel = ({video,handleOnMouseOver,handleOnMouseOut,handleClickOnVideo}) => {
    return (
        <Space direction={"vertical"}>
            <Card title={video.title} size="large" style={{maxWidth:500, height: "auto", marginBottom: 12, marginRight: 3, padding: 0}}>
                <img
                    onClick={handleClickOnVideo}
                    onMouseOver={e=>handleOnMouseOver(e)}
                    onMouseOut={e=>handleOnMouseOut(e)}
                    src={video.urlOnPreview}
                    alt={video.title}
                    style={{height:202, width:360, border: '2px solid transparent', borderRadius:'6px'}}
                />
                <br/>
                <Space direction={"horizontal"} style={{display:'flex', justifyContent:'space-between'}}>
                    <Space>
                        <Avatar src={video.urlOnPreview} alt={video.title}/>
                        <p>{video.ownerLogin}</p>
                    </Space>
                </Space>
            </Card>
        </Space>
    );
};

export default VideoForAdminPanel;