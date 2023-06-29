import React, {useContext, useState} from 'react';
import {App, Card, Menu, Space} from "antd";
import {HeartOutlined, InfoOutlined, SettingOutlined, VideoCameraOutlined} from "@ant-design/icons";
import Info from './pagesProfile/Info';
import Videos from "./pagesProfile/Videos";
import Favorites from "./pagesProfile/Favorites";
import Settings from "./pagesProfile/Settings";
import {Context} from "../index";
import RegAndAuth from "../components/RegAndAuth";
import classes from './styles/Profile.module.css'

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
]


const Profile = () => {
    const {user} = useContext(Context);
    const [videos,setVideos] = useState();
    const [current, setCurrent] = useState(null);
    const handlerClickNav = (e) =>{
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
                    {current === 'info' && <Info/>}
                    {current === 'videos' && <Videos/>}
                    {current === 'favorites' && <Favorites/>}
                    {current === 'settings' && <Settings/>}
                </Space>
            </Space>
        </App>
    );
};

export default Profile;