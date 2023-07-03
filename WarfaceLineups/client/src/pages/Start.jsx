import React from 'react';
import {Button, Carousel, Space, Typography} from "antd";
import {useNavigate} from "react-router-dom";

const Start = () => {
    const insideContentStyle = {
        height: 450,
        color: '#fff',
        lineHeight: '450px',
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
        </div>
    );
};

export default Start;