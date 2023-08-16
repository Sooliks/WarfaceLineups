import React, {useEffect, useState} from 'react';
import StatsGameAPI from "../../../http/api/wftracker/StatsGameAPI";
import {Button, Spin, Table} from "antd";
import Clan from "../Stats/Clan";

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
    const[loading, setLoading] = useState(true);
    const[isVisibleClanMembers,setIsVisibleClanMembers] = useState(false);
    const [dataSource,setDataSource] = useState( []);
    const [dataSourceClanMembers,setDataSourceClanMembers] = useState( []);
    useEffect(()=>{
        StatsGameAPI.getTop10ClansRu().then(data=>{
            setDataSource(data);
            setLoading(false);
        }).catch(e=>window.location.reload())
    },[])
    const handleClickOnMemberClan = (name) =>{
        setLoading(true);
        StatsGameAPI.getClanMembers(name).then(data=>{
            setDataSourceClanMembers(data);
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
                <Clan data={dataSourceClanMembers.members} name={dataSourceClanMembers.name} onHide={()=>setIsVisibleClanMembers(false)}></Clan>
            }
        </div>
    );
};

export default Top10Clans;