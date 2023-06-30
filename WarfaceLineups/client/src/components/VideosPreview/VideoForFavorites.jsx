import React, {useState} from 'react';
import {Avatar, Button, Card, Space} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";

const VideoForFavorites = ({video,handleClickOnVideo,handleOnMouseOver,handleOnMouseOut}) => {
    const[currentIconHeart,setCurrentIconHeart] = useState(<HeartFilled/>);
    const handlerClickHeart = () =>{
        setCurrentIconHeart(<HeartOutlined/>);
    }

    return (
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
                <Space direction={"horizontal"} style={{display:'flex', justifyContent:'space-between'}}>
                    <Space>
                        <Avatar src={video.urlOnPreview} alt={video.title}/>
                        <p>{video.ownerId}</p>
                    </Space>
                    <Button type="dashed" shape="circle" icon={currentIconHeart} onClick={handlerClickHeart} />
                </Space>
            </Card>
        </Space>
    );
};

export default VideoForFavorites;