import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Card, Skeleton} from "antd";
import Meta from "antd/es/card/Meta";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import SettingsModal from "./Settings/SettingsModal";
import EditingModal from "./Settings/EditingModal";

const Settings = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [isVisibleSettingsModal,setIsVisibleModal] = useState('');
    useEffect(() => {

    },[])
    return (
        <div>
            <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                    <SettingOutlined key="setting" onClick={()=>setIsVisibleModal('setting')}/>,
                    <EditOutlined key="edit" onClick={()=>setIsVisibleModal('edit')}/>,
                    <EllipsisOutlined key="ellipsis" onClick={()=>setIsVisibleModal('ellipsis')}/>,
                ]}
            >
                <Skeleton loading={loading} avatar active>
                    <Meta
                        avatar={<Avatar src={`http://localhost:5258/api/avatar/${user.user.id}`} alt={user.user.login}/>}
                        title={user.user.login}
                        description="This is the description"
                    />
                </Skeleton>
            </Card>
            {isVisibleSettingsModal === 'setting' && <SettingsModal onHide={()=>setIsVisibleModal('')}/>}
            {isVisibleSettingsModal === 'edit' && <EditingModal onHide={()=>setIsVisibleModal('')}/>}
        </div>
    );
});

export default Settings;