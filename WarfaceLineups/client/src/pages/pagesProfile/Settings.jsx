import React, {useContext, useState} from 'react';
import {Avatar, Card, Skeleton} from "antd";
import Meta from "antd/es/card/Meta";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Settings = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(false);
    console.log(user.isAuth);
    return (
        <div>
            <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Skeleton loading={loading} avatar active>
                    <Meta
                        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"  alt={user.login}/>}
                        title={user.login}
                        description="This is the description"
                    />
                </Skeleton>
            </Card>
        </div>
    );
});

export default Settings;