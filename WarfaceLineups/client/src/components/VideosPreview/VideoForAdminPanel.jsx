import React from 'react';
import {Avatar, Button, Card, Space} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import VideosAPI from "../../http/api/VideosAPI";
import {isDevelopmentMode} from "../../conf";


const VideoForAdminPanel = ({video,handleOnMouseOver,handleOnMouseOut,handleClickOnVideo}) => {
    const handleClickAccept = () =>{
        try {
            VideosAPI.publishVideo(video.id).then(data => {
                if (data.message === "success") {
                    window.location.reload();
                }
            })
        }catch (e) {
            window.location.reload();
        }
    }
    const handleClickDecline = () =>{
        VideosAPI.deleteVideo(video.id).then(data => {
            if (data.message === "success") {
                window.location.reload();
            }
        }).catch(e=>window.location.reload())
    }

    return (
        <Space direction={"vertical"}>
            <Card title={video.title} size="large" style={{maxWidth:500, height: "auto", marginBottom: 12, marginRight: 3, padding: 0}}>
                <img
                    onClick={handleClickOnVideo}
                    onMouseOver={e=>handleOnMouseOver(e)}
                    onMouseOut={e=>handleOnMouseOut(e)}
                    src={video.screenShotsId===0 ? video.urlOnPreview : isDevelopmentMode ? `http://localhost:5258/api/getlineupscreenshots/${video.screenShotsId}/0` : `/api/getlineupscreenshots/${video.screenShotsId}/0`}
                    alt={video.title}
                    style={{height:202, width:345, border: '2px solid transparent', borderRadius:'6px'}}
                />
                <br/>
                <Space direction={"horizontal"} style={{display:'flex', justifyContent:'space-between'}}>
                    <Space>
                        <Avatar src={`/api/avatar/${video.ownerId}`} alt={video.title}/>
                        <p>{video.ownerLogin}</p>
                    </Space>
                    <Space>
                        <Button type="primary" icon={<CheckOutlined/>} onClick={handleClickAccept}>
                            Принять
                        </Button>
                        <Button type="primary" icon={<CloseOutlined/>} onClick={handleClickDecline} danger>
                            Отклонить
                        </Button>
                    </Space>
                </Space>
            </Card>
        </Space>
    );
};

export default VideoForAdminPanel;