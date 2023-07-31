import React, {useContext, useEffect} from 'react';
import {Button, Carousel, Space, Typography } from "antd";

import {useNavigate} from "react-router-dom";
import classes from './styles/Start.module.css'
import {Context} from "../index";
const { Text, Link } = Typography;


const Start = () => {
    const insideContentStyle = {
        height: 350,
        color: '#fff',
        lineHeight: '350px',

        background: '#1e1d1d',
        textAlign: 'center',
    };
    const navigate = useNavigate();
    const {nav} = useContext(Context);

    useEffect(()=>{
        nav.setNav("/")
        navigate("/");
    },[])


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
                    <Button type={"primary"} onClick={()=>{
                        nav.setNav("/profile")
                        navigate("/profile");
                    }}>Начать</Button>
                </Space>
            </Space>
            <Space className={classes.footer} direction={"vertical"} style={{display:'flex',justifyContent:'center'}}>
                <Space>
                    <Text>Warface Lineups ©2023 Created by <Link href="https://t.me/soolikss" target="_blank">Sooliks</Link> powered by wfstats.cf</Text>
                </Space>
                <Space style={{alignSelf:'flex-end'}}>
                    <Text><Link href="https://t.me/warfacelineups" target="_blank">Telegram</Link></Text>
                </Space>
            </Space>
        </div>
    );
};

export default Start;