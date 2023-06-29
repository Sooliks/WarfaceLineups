import React, {useState} from 'react';
import {App, Card, Space} from "antd";



const Profile = () => {
    const [videos,setVideos] = useState();
    return (
        <App>
            <Space direction="vertical" size="large" align={"start"} style={{ display: 'flex', margin:12 }}>
                <Card title="Card" size="large">
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card title="Card" size="large">
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card title="Card" size="large">
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Space>
        </App>
    );
};

export default Profile;