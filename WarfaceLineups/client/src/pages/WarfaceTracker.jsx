import React, {useState} from 'react';
import {Menu, Space, Spin} from "antd";
import {RiseOutlined, StockOutlined} from "@ant-design/icons";


import Settings from "./pagesProfile/Settings";

import CurrentOnline from "./WarfaceTracker/StatsGame/CurrentOnline";
import Top100Players from "./WarfaceTracker/StatsGame/Top100Players";
import Top100Clans from "./WarfaceTracker/StatsGame/Top100Clans";
import SearchPlayer from "./WarfaceTracker/Stats/SearchPlayer";
import SearchClan from "./WarfaceTracker/Stats/SearchClan";
import classes from "../Main.module.css";



function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Статистика игры', 'sub1', <RiseOutlined/>, [
        getItem('Текущий онлайн', 'currentonline'),
        getItem('Топ 100 игроков', 'top100players'),
        getItem('Топ 100 кланов', 'top100clans'),
    ]),
    getItem('Статистика', 'sub2', <StockOutlined/>, [
        getItem('Найти игрока', 'searchplayer'),
        getItem('Найти клан', 'searchclan'),
    ]),
    {
        type: 'divider',
    },
];



const WarfaceTracker = () => {
    const[loading, setLoading] = useState(false);
    const [current, setCurrent] = useState('currentonline');
    const handlerClickNav = (e) =>{
        setCurrent(e.key);
    }
    return (
        <div>
            <Space direction={"horizontal"} size="large" align={"start"} style={{ display: 'flex'}}>
                <Menu
                    onClick={handlerClickNav}
                    style={{
                        width: 256,
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
                {loading ? <Spin size="large" className={classes.spinnerLoading}/> :
                    <Space direction={"horizontal"} style={{display: 'flex', margin: 12}}>
                        {current === 'currentonline' && <CurrentOnline setLoading={setLoading}/>}
                        {current === 'top100players' && <Top100Players/>}
                        {current === 'top100clans' && <Top100Clans/>}
                        {current === 'searchplayer' && <SearchPlayer/>}
                        {current === 'searchclan' && <SearchClan/>}
                    </Space>
                }
            </Space>
        </div>
    );
};

export default WarfaceTracker;