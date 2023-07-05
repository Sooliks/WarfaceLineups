import React from 'react';
import {Avatar, Button, Card, Space} from "antd";
import {CheckOutlined, CloseOutlined, HeartFilled, HeartOutlined} from "@ant-design/icons";
import VideosAPI from "../../http/api/VideosAPI";
import {useNavigate} from "react-router-dom";

const VideoForAdminPanel = ({video,handleOnMouseOver,handleOnMouseOut,handleClickOnVideo}) => {
    const navigate = useNavigate();
    const handleClickAccept = () =>{
        VideosAPI.publishVideo(video.id).then(data=>{
            if(data.message==="success"){
                window.location.reload();
            }
        })
    }
    const handleClickDecline = () =>{
        VideosAPI.deleteVideo(video.id).then(data=>{
            if(data.message==="success"){
                window.location.reload();
            }
        })
    }

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
                        <Avatar src={`http://localhost:5258/api/avatar/${video.ownerId}`} alt={video.title}/>
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