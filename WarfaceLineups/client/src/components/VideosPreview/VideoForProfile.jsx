import React from 'react';
import {Card, Space} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {isDevelopmentMode} from "../../conf";

const VideoForProfile = ({video,handleClickOnVideo,handleOnMouseOver,handleOnMouseOut}) => {
    return (
        <Space direction={"vertical"}>
            <Card title={video.title} size="large" style={{maxWidth:500, height: 346, marginBottom: 12, marginRight: 3, padding: 0}}>
                <img
                    src={video.screenShotsId===0 ? video.urlOnPreview : isDevelopmentMode ? `http://localhost:5258/api/getlineupscreenshots/${video.screenShotsId}/0` : `api/getlineupscreenshots/${video.screenShotsId}/0`}
                    alt={video.title}
                    onClick={handleClickOnVideo}
                    onMouseOver={e=>handleOnMouseOver(e)}
                    onMouseOut={e=>handleOnMouseOut(e)}
                    style={{height:202, width:342, border: '2px solid transparent', borderRadius:'6px'}}
                />
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