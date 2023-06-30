import React, {useContext, useState} from 'react';
import {App, Card, Menu, Space} from "antd";
import {HeartOutlined, InfoOutlined, LogoutOutlined, SettingOutlined, VideoCameraOutlined} from "@ant-design/icons";
import Info from './pagesProfile/Info';
import Videos from "./pagesProfile/Videos";
import Favorites from "./pagesProfile/Favorites";
import Settings from "./pagesProfile/Settings";
import {Context} from "../index";
import RegAndAuth from "../components/RegAndAuth";
import classes from './styles/Profile.module.css'
import {observer} from "mobx-react-lite";



const items = [
    {
        label: 'Информация',
        key: 'info',
        icon: <InfoOutlined/>,
    },
    {
        label: 'Ваши видео',
        key: 'videos',
        icon: <VideoCameraOutlined/>,
    },
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
]


const Profile = observer(() => {
    const {user} = useContext(Context);
    const [current, setCurrent] = useState('videos');
    const handlerClickNav = (e) =>{
        if(e.key==="logout"){
            user.setIsAuth(false);
            setCurrent(null);
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
                        mode="vertical"
                        items={items}
                        style={{width: 270,}}
                    />
                }
                <Space direction="horizontal" size="large">
                    {current === 'info' && user.isAuth && <Info/>}
                    {current === 'videos' && user.isAuth && <Videos/>}
                    {current === 'favorites' && user.isAuth && <Favorites/>}
                    {current === 'settings' && user.isAuth && <Settings/>}
                </Space>
            </Space>
        </App>
    );
});

export default Profile;