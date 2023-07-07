import React from 'react';
import {Button, Space, Table} from "antd";

const Player = ({data,onHide,name}) => {
    const columnsStats = [
        {
            title: 'Ранг',
            dataIndex: 'rank_id',
            key: 'rank_id',
        },
        {
            title: 'Ранг',
            dataIndex: 'rank_id',
            key: 'rank_id',
        },
        {
            title: 'Очки',
            dataIndex: 'stat.player_resurrect_made_new',
            key: 'stat.player_resurrect_made_new',
        },
    ];
    return (
        <Space direction={"vertical"} style={{width:700}}>
            <Space direction={"horizontal"} style={{display:'flex', justifyContent:'space-between'}}>
                <h3>{name}</h3>
                <Button onClick={onHide}>Назад</Button>
            </Space>
            <Table dataSource={data} columns={columnsStats}/>
        </Space>
    );
};

export default Player;