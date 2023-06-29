import React from 'react';
import {Card} from "antd";

const VideoPreview = ({video}) => {
    return (
        <div>
            <Card title={video.title} size="large" style={{width:360, height: "auto", margin: 12}}>
                <p>Card content1</p>
                <p>Card content</p>
            </Card>
        </div>
    );
};

export default VideoPreview;