import React, {useContext, useEffect, useState} from 'react';
import {Affix, Menu} from 'antd';
import {
    AimOutlined,
    ArrowsAltOutlined,
    CrownOutlined,
    FileDoneOutlined,
    RadarChartOutlined, SolutionOutlined,
    UserOutlined, VideoCameraOutlined
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
import Tactics from "../pages/Tactics";
import AimTracking from "../pages/AimTracking";
import RouteOnLineup from "./RouteOnLineup";



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
        icon: <VideoCameraOutlined />,
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
        label: 'Tactics',
        key: '/tactics',
        icon: <SolutionOutlined/>,
    },
    {
        label: 'Warface Tracker',
        key: '/wftracker',
        icon: <RadarChartOutlined/>,
    },
    {
        label: 'Aim Tracking',
        key: '/aimtracking',
        icon: <AimOutlined/>,
    },
]


const AppRouter = () => {
    const {nav} = useContext(Context);
    const location = useLocation();
    useEffect(()=>{
        nav.setNav(location.pathname);
    },[])
    const handlerClickNav = (e) =>{
        nav.setNav(e.key);
        navigate(e.key);
    }
    const navigate = useNavigate();
    const [container, setContainer] = useState(null);
    return (
        <App>
            <div ref={setContainer}>
                <Affix target={() => container}>
                    <Menu onClick={handlerClickNav} selectedKeys={[nav.nav]} mode="horizontal" items={items} />
                </Affix>
                <Routes>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/lineups"} element={<Lineups/>}></Route>
                    <Route path={"/lineups/:id"} element={<RouteOnLineup/>}></Route>
                    <Route path={"/premium"} element={<Premium/>}/>
                    <Route path={"/news"} element={<News/>}/>
                    <Route path={"/wftracker"} element={<WarfaceTracker/>}/>
                    <Route path={"/"} element={<Start/>}/>
                    <Route path={"/passwordrecovery"} element={<PasswordRecovery/>}/>
                    <Route path={"/tactics"} element={<Tactics/>}/>
                    <Route path={"/aimtracking"} element={<AimTracking/>}/>
                </Routes>
            </div>
        </App>
    );
};

export default AppRouter;