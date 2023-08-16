import React, {useEffect, useState} from 'react';
import {Button, Card, Space, Typography} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import NotificationsAPI from "../../http/api/NotificationsAPI";
const { Text } = Typography;


const Notifications = () => {
    const[notifications,setNotifications] = useState([]);
    useEffect(()=>{
        NotificationsAPI.getNotifications().then(data=>setNotifications(data)).catch(e=>window.location.reload());
    },[])
    const handleClickClose = (notify) =>{
        NotificationsAPI.deleteNotifications(notify.id).then(data=>{
            const newArr = notifications.filter(n=>n!==notify);
            setNotifications(newArr);
        })
    }

    return (
        <Space direction={"vertical"} style={{display:'flex', width:500}}>
            {notifications.length!==0 ? notifications.map(notify=>
                <Card key={notify.id}>
                    <Button type="dashed" icon={<CloseOutlined/>} style={{position: 'absolute',marginLeft:420}} onClick={()=>handleClickClose(notify)}></Button>
                    <Space direction={"vertical"}>
                        <h2>{notify.title}</h2>
                        <Text type="secondary">{notify.text}</Text>
                    </Space>
                </Card>
            )
                : <h3>Уведомлений пока нет</h3>
            }
        </Space>
    );
};

export default Notifications;