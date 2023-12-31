import React, {useContext, useState} from 'react';
import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import SettingsModal from "./Settings/SettingsModal";
import EditingModal from "./Settings/EditingModal";
import EllipsisModal from "./Settings/EllipsisModal";
import {isDevelopmentMode} from "../../conf";

const Settings = observer(() => {
    const {user} = useContext(Context);
    const [isVisibleSettingsModal,setIsVisibleModal] = useState('');
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
                <Meta
                    avatar={<Avatar src={isDevelopmentMode ? `http://localhost:5258/api/avatar/${user.user.id}` : `/api/avatar/${user.user.id}`} alt={user.user.login}/>}
                    title={user.user.login}
                    description=""
                />
            </Card>
            {isVisibleSettingsModal === 'setting' && <SettingsModal onHide={()=>setIsVisibleModal('')}/>}
            {isVisibleSettingsModal === 'edit' && <EditingModal onHide={()=>setIsVisibleModal('')}/>}
            {isVisibleSettingsModal === 'ellipsis' && <EllipsisModal onHide={()=>setIsVisibleModal('')}/>}
        </div>
    );
});

export default Settings;