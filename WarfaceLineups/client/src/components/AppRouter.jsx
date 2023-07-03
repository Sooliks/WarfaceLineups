import React, {useEffect, useState} from 'react';
import {Menu} from 'antd';
import {CrownOutlined, FileDoneOutlined, ProfileOutlined, RadarChartOutlined, UserOutlined} from '@ant-design/icons';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Profile from "../pages/Profile";
import Lineups from "../pages/Lineups";
import Premium from "../pages/Premium";
import { App } from 'antd';
import News from "../pages/News";
import WarfaceTracker from "../pages/WarfaceTracker";
import Start from "../pages/Start";



const items = [
    {
        label: 'Профиль',
        key: '/profile',
        icon: <UserOutlined />,
    },
    {
        label: 'Lineups',
        key: '/lineups',
        icon: <ProfileOutlined/>,
    },
    {
        label: 'Premium',
        key: '/premium',
        icon: <CrownOutlined />,
    },
    {
        label: 'Новости',
        key: '/news',
        icon: <FileDoneOutlined/>,
    },
    {
        label: 'Warface Tracker',
        key: '/wftracker',
        icon: <RadarChartOutlined/>,
    },
]


const AppRouter = () => {
    const [current, setCurrent] = useState(null);
    const location = useLocation();
    useEffect(()=>{
        setCurrent(location.pathname);
    },[])
    const handlerClickNav = (e) =>{
        setCurrent(e.key);
        navigate(e.key);
    }
    const navigate = useNavigate();
    return (
        <App>
            <div>
                <Menu onClick={handlerClickNav} selectedKeys={[current]} mode="horizontal" items={items} />
                <Routes>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/lineups"} element={<Lineups/>}/>
                    <Route path={"/premium"} element={<Premium/>}/>
                    <Route path={"/news"} element={<News/>}/>
                    <Route path={"/wftracker"} element={<WarfaceTracker/>}/>
                    <Route path={"/"} element={<Start/>}/>
                </Routes>
            </div>
        </App>
    );
};

export default AppRouter;