import React, {useContext, useEffect, useState} from 'react';
import {Affix, App, Card, Menu, Space} from "antd";
import {
    DesktopOutlined,
    HeartOutlined,
    InfoOutlined,
    LogoutOutlined, MailOutlined,
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
import CreateVideo from "./pagesProfile/CreateVideo";
import UnVerifiedVideos from "./pagesProfile/AdminPanel/UnVerifiedVideos";
import Panel from "./pagesProfile/AdminPanel/Panel";
import {cookies} from "../data/cookies";
import AddNews from "./pagesProfile/AdminPanel/AddNews";
import Notifications from "./pagesProfile/Notifications";
import CreateScreenshots from "./pagesProfile/CreateScreenshots";
import Reports from "./pagesProfile/AdminPanel/Reports";



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
            getItem('Ваши Lineups', 'videos', null),
            getItem('Создать с помощью Youtube', 'addnewvideo', null),
            getItem('Создать с помощью скриншотов', 'addnewscreenshots', null),
        ]),
        {
            label: 'Избранное',
            key: 'favorites',
            icon: <HeartOutlined/>,
        },
        {
            label: `Уведомления`,
            key: 'notifications',
            icon: <MailOutlined/>,
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
                    getItem('Ваши Lineups', 'videos', null),
                    getItem('Создать с помощью Youtube', 'addnewvideo', null),
                    getItem('Создать с помощью скриншотов', 'addnewscreenshots', null),
                ]),
                {
                    label: 'Избранное',
                    key: 'favorites',
                    icon: <HeartOutlined/>,
                },
                {
                    label: `Уведомления`,
                    key: 'notifications',
                    icon: <MailOutlined/>,
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
                    getItem('Не верифицированные lineups', 'unverifiedvideos', null),
                    getItem('Panel', 'panel', null),
                    getItem('Добавить новость', 'addnews', null),
                    getItem('Reports', 'reports', null),
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
            user.setUser({...user.user,
                id: null,
                login: 'Здесь логин',
                email: "Здесь email",
                role: 'member',
                jwt: "",
                isVerifiedAccount: false,
                isPremiumAccount: false
            })
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
                    <Affix offsetTop>
                        <Menu
                            onClick={handlerClickNav}
                            selectedKeys={[current]}
                            mode="inline"
                            items={items}
                            style={{width: 270,}}
                            defaultOpenKeys={['sub1']}
                        />
                    </Affix>
                }
                <Space direction="horizontal" size="large" style={{marginTop:12}}>
                    {current === 'info' && user.isAuth && <Info/>}
                    {current === 'videos' && user.isAuth && <Videos/>}
                    {current === 'favorites' && user.isAuth && <Favorites/>}
                    {current === 'settings' && user.isAuth && <Settings/>}
                    {current === 'addnewvideo' && user.isAuth && <CreateVideo/>}
                    {current === 'notifications' && user.isAuth && <Notifications/>}
                    {current === 'unverifiedvideos' && user.user.role === 'admin' && user.isAuth && <UnVerifiedVideos/>}
                    {current === 'panel' && user.user.role === 'admin' && user.isAuth && <Panel/>}
                    {current === 'addnews' && user.user.role === 'admin' && user.isAuth && <AddNews/>}
                    {current === 'addnewscreenshots' && user.isAuth && <CreateScreenshots/>}
                    {current === 'reports' && user.user.role === 'admin' && user.isAuth && <Reports/>}
                </Space>
            </Space>
        </App>
    );
});

export default Profile;