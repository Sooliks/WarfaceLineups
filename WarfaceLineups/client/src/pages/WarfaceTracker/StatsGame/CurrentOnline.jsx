import React, {useEffect, useState} from 'react';
import {Card, Space, Spin} from "antd";
import StatsGameAPI from "../../../http/api/wftracker/StatsGameAPI";
import classes from "../../../Main.module.css";


const CurrentOnline = () => {
    useEffect(()=>{
        StatsGameAPI.getOnlineServer('ru').then(data=>{
            setOnlineRuServer(data)
            setLoadingr(false);
        })
        StatsGameAPI.getOnlineServer('eu').then(data=>{
            setOnlineEuServer(data)
            setLoadinge(false);
        })
    },[])
    const[onlineRuServer, setOnlineRuServer] = useState({
        all: 0,
        max24: {all: 0, time: 0},
        pve: 0,
        pvp: 0,
        time: 0
    });
    const[onlineEuServer, setOnlineEuServer] = useState({
        all: 0,
        max24: {all: 0, time: 0},
        pve: 0,
        pvp: 0,
        time: 0
    });
    const[loadingr, setLoadingr] = useState(true);
    const[loadinge, setLoadinge] = useState(true);
    return (
        <Space direction={"vertical"}>
            <Card title={"Ru Server"}>
                {loadingr ? <Spin size="large"/> :
                    <Space direction={"horizontal"}
                           style={{display: 'flex', width: 800, justifyContent: 'space-around', flexDirection: 'row'}}>
                        <Card title={"Текущий онлайн"}>
                            {onlineRuServer.all}
                        </Card>
                        <Card title={"Максимальный за 24 часа"}>
                            {onlineRuServer.max24.all}
                        </Card>
                        <Card title={"Pvp"} style={{width: 100}}>{onlineRuServer.pvp}</Card>
                        <Card title={"Pve"} style={{width: 100}}>{onlineRuServer.pve}</Card>
                    </Space>
                }
            </Card>
            <Card title={"Eu Server"}>
                {loadinge ? <Spin size="large"/> :
                    <Space direction={"horizontal"}
                           style={{display: 'flex', width: 800, justifyContent: 'space-around', flexDirection: 'row'}}>
                        <Card title={"Текущий онлайн"}>
                            {onlineEuServer.all}
                        </Card>
                        <Card title={"Максимальный за 24 часа"}>
                            {onlineEuServer.max24.all}
                        </Card>
                        <Card title={"Pvp"} style={{width: 100}}>{onlineEuServer.pvp}</Card>
                        <Card title={"Pve"} style={{width: 100}}>{onlineEuServer.pve}</Card>
                    </Space>
                }
            </Card>
        </Space>
    );
};

export default CurrentOnline;