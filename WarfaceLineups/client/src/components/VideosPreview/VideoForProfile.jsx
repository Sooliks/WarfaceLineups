import React from 'react';
import {Card, Space} from "antd";

const VideoForProfile = ({video,handleClickOnVideo,handleOnMouseOver,handleOnMouseOut}) => {
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

                    </Space>
                </Space>
            </Card>
        </Space>
    );
};

export default VideoForProfile;