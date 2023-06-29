import React, {useContext, useEffect, useState} from 'react';
import {Menu} from 'antd';
import {CrownOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Profile from "../pages/Profile";
import Lineups from "../pages/Lineups";
import Premium from "../pages/Premium";
import { App } from 'antd';
import {Context} from "../index";


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

                </Routes>
            </div>
        </App>
    );
};

export default AppRouter;