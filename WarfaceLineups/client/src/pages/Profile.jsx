import React, {useContext, useEffect, useState} from 'react';
import {App, Card, Menu, Space} from "antd";
import {
    DesktopOutlined,
    HeartOutlined,
    InfoOutlined,
    LogoutOutlined,
    SettingOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import Info from './pagesProfile/Info';
import Videos from "./pagesProfile/Videos";
import Favorites from "./pagesProfile/Favorites";
import Settings from "./pagesProfile/Settings";
import {Context} from "../index";
import RegAndAuth from "../components/RegAndAuth";
import classes from './styles/Profile.module.css'
import {observer} from "mobx-react-lite";
import {cookies} from "../data/Cookie";
import CreateVideo from "./pagesProfile/CreateVideo";
import UnVerifiedVideos from "./pagesProfile/AdminPanel/UnVerifiedVideos";
import Panel from "./pagesProfile/AdminPanel/Panel";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const Profile = observer(() => {
    const [items,setItems] = useState([
        {
            label: 'Информация',
            key: 'info',
            icon: <InfoOutlined/>,
        },
        getItem('Lineups', 'sub1', <VideoCameraOutlined />, [
            getItem('Ваши видео', 'videos', null),
            getItem('Создать', 'addnewvideo', null),
        ]),
        {
            label: 'Избранное',
            key: 'favorites',
            icon: <HeartOutlined/>,
        },
        {
            label: 'Настройки',
            key: 'settings',
            icon: <SettingOutlined/>,
        },
        {
            label: 'Выйти',
            key: 'logout',
            icon: <LogoutOutlined/>,
        },
    ])
    const {user} = useContext(Context);
    useEffect(()=>{
        if(user.user.role === 'admin'){
            setItems([
                {
                    label: 'Информация',
                    key: 'info',
                    icon: <InfoOutlined/>,
                },
                getItem('Lineups', 'sub1', <VideoCameraOutlined />, [
                    getItem('Ваши видео', 'videos', null),
                    getItem('Создать', 'addnewvideo', null),
                ]),
                {
                    label: 'Избранное',
                    key: 'favorites',
                    icon: <HeartOutlined/>,
                },
                {
                    label: 'Настройки',
                    key: 'settings',
                    icon: <SettingOutlined/>,
                },
                {
                    label: 'Выйти',
                    key: 'logout',
                    icon: <LogoutOutlined/>,
                },
                getItem('Admin Panel', 'sub2', <DesktopOutlined />, [
                    getItem('Не верифицированные видео', 'unverifiedvideos', null),
                    getItem('Panel', 'panel', null),
                ]),
            ])
        }
    },[])
    const [current, setCurrent] = useState('videos');
    const handlerClickNav = (e) =>{
        if(e.key==="logout"){
            user.setIsAuth(false);
            setCurrent(null);
            cookies.set('jwt',null);
            cookies.set('login',null);
            return
        }
        setCurrent(e.key);
    }
    return (
        <App>
            <Space direction="horizontal" size="large" align={"start"} style={{ display: 'flex'}}>
                {!user.isAuth ?
                    <Card className={classes.m}> <RegAndAuth/> </Card>
                    :
                    <Menu
                        onClick={handlerClickNav}
                        selectedKeys={[current]}
                        mode="inline"
                        items={items}
                        style={{width: 270,}}
                        defaultOpenKeys={['sub1']}
                    />
                }
                <Space direction="horizontal" size="large" style={{margin:12}}>
                    {current === 'info' && user.isAuth && <Info/>}
                    {current === 'videos' && user.isAuth && <Videos/>}
                    {current === 'favorites' && user.isAuth && <Favorites/>}
                    {current === 'settings' && user.isAuth && <Settings/>}
                    {current === 'addnewvideo' && user.isAuth && <CreateVideo/>}
                    {current === 'unverifiedvideos' && user.user.role === 'admin' && user.isAuth && <UnVerifiedVideos/>}
                    {current === 'panel' && user.user.role === 'admin' && user.isAuth && <Panel/>}
                </Space>
            </Space>
        </App>
    );
});

export default Profile;