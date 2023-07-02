import React, {useEffect, useState} from 'react';
import StatsGameAPI from "../../../http/api/wftracker/StatsGameAPI";
import {Button, Space, Spin, Table} from "antd";

const Top10Clans = () => {
    const columns = [
        {
            title: 'Название клана',
            dataIndex: 'clan',
            key: 'clan',
            render: (text) => <Button type="link" onClick={()=>handleClickOnMemberClan(text)}>{text}</Button>,
        },
        {
            title: 'Клан лидер',
            dataIndex: 'clan_leader',
            key: 'clan_leader',
        },
        {
            title: 'Игроков в клане',
            dataIndex: 'members',
            key: 'members',
        },
        {
            title: 'Очки',
            dataIndex: 'points',
            key: 'points',
        },
        {
            title: 'Место',
            dataIndex: 'rank',
            key: 'rank',
        },
    ];
    const columnsClanMembers = [
        {
            title: 'Никнейм',
            dataIndex: 'nickname',
            key: 'nickname',
            render: (text) => <Button type="link">{text}</Button>,
        },
        {
            title: 'Ранг',
            dataIndex: 'rank_id',
            key: 'rank_id',
        },
        {
            title: 'Очки',
            dataIndex: 'clan_points',
            key: 'clan_points',
        },
    ];
    const[isVisibleClanMembers,setIsVisibleClanMembers] = useState(false)
    const[loading, setLoading] = useState(true);
    const [dataSource,setDataSource] = useState( []);
    const [dataSourceClanMembers,setDataSourceClanMembers] = useState( []);
    useEffect(()=>{
        StatsGameAPI.getTop10ClansRu().then(data=>{
            setDataSource(data);
            setLoading(false);
        })
    },[])
    const handleClickOnMemberClan = (name) =>{
        setLoading(true);
        StatsGameAPI.getClanMembers(name).then(data=>{
            setDataSourceClanMembers(data.members);
            setIsVisibleClanMembers(true);
            setLoading(false);
        })
    }
    if(loading)return <Spin size="large"/>
    return (
        <div>
            {!isVisibleClanMembers ?
                <Table dataSource={dataSource} columns={columns}/>
                :
                <Space direction={"vertical"}>
                    <Space direction={"horizontal"}>
                        <Button onClick={()=>setIsVisibleClanMembers(false)}>Назад</Button>
                        <h3></h3>
                    </Space>
                    <Table dataSource={dataSourceClanMembers} columns={columnsClanMembers} style={{width:700}}/>
                </Space>
            }
        </div>
    );
};

export default Top10Clans;