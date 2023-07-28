import React, {useContext, useEffect, useState} from 'react';
import {Menu} from 'antd';
import {
    ArrowsAltOutlined,
    CrownOutlined,
    FileDoneOutlined,
    ProfileOutlined,
    RadarChartOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Profile from "../pages/Profile";
import Lineups from "../pages/Lineups";
import Premium from "../pages/Premium";
import { App } from 'antd';
import News from "../pages/News";
import WarfaceTracker from "../pages/WarfaceTracker";
import Start from "../pages/Start";
import PasswordRecovery from "../pages/PasswordRecovery";
import {Context} from "../index";



const items = [
    {
        label: 'Главная',
        key: '/',
        icon: <ArrowsAltOutlined/>,
    },
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
    const {nav} = useContext(Context);
    const location = useLocation();
    useEffect(()=>{
        nav.setNav(location.pathname);
    },[])
    const handlerClickNav = (e) =>{
        console.log(e.key)
        nav.setNav(e.key);
        navigate(e.key);
    }
    const navigate = useNavigate();
    return (
        <App>
            <div>
                <Menu onClick={handlerClickNav} selectedKeys={[nav.nav]} mode="horizontal" items={items} />
                <Routes>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/lineups"} element={<Lineups/>}/>
                    <Route path={"/premium"} element={<Premium/>}/>
                    <Route path={"/news"} element={<News/>}/>
                    <Route path={"/wftracker"} element={<WarfaceTracker/>}/>
                    <Route path={"/"} element={<Start/>}/>
                    <Route path={"/passwordrecovery"} element={<PasswordRecovery/>}/>
                </Routes>
            </div>
        </App>
    );
};

export default AppRouter;