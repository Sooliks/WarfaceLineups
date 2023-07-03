import React from 'react';
import {Button, Carousel, Space} from "antd";

import {useNavigate} from "react-router-dom";
import classes from './styles/Start.module.css'



const Start = () => {
    const insideContentStyle = {
        height: 350,
        color: '#fff',
        lineHeight: '350px',
        background: '#323234',
        textAlign: 'center',
    };
    const navigate = useNavigate();
    return (
        <div>
            <div>
                <div>
                    <Carousel autoplay destroyOnClose>
                        <Space>
                            <h3 style={insideContentStyle}>Warface Lineups - это сайт где вы можете загрузить свои раскидки и в будущем сетапы, а также искать их</h3>
                        </Space>
                        <Space>
                            <h3 style={insideContentStyle}>Warface Tracker - это сервис для просмотра статистики игры</h3>
                        </Space>
                    </Carousel>
                </div>
            </div>
            <Space direction={"vertical"} style={{display:'flex', alignItems: 'center'}}>
                <h1>Warface Lineups</h1>
                <Space direction={"horizontal"}>
                    <Button type={"primary"} onClick={()=>navigate("/profile")}>Начать</Button>
                </Space>
            </Space>
            <div className={classes.footer}>
                Warface Lineups ©2023 Created by Sooliks, powered by wfstats.cf
            </div>
        </div>
    );
};

export default Start;