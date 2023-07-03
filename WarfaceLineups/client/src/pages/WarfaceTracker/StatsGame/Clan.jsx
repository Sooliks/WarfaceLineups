import React from 'react';
import {Button, Space, Table} from "antd";

const Clan = ({data,onHide,name}) => {
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
    return (
        <Space direction={"vertical"} style={{width:700}}>
            <Space direction={"horizontal"} style={{display:'flex', justifyContent:'space-between'}}>
                <h3>{name}</h3>
                <Button onClick={onHide}>Назад</Button>
            </Space>
            <Table dataSource={data} columns={columnsClanMembers}/>
        </Space>
    );
};

export default Clan;