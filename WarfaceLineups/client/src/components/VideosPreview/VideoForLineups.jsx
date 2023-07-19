import React, {useContext, useState} from 'react';
import {Avatar, Button, Card, Space, notification, Modal, Typography} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {cookiesFromFavorites} from "../../data/cookies";
import VideosAPI from "../../http/api/VideosAPI";
import {Spin} from "antd/lib";
import ModalOtherProfile from "../ModalOtherProfile";

const { Link } = Typography;

const VideoForLineups = observer(({video,handleClickOnVideo,handleOnMouseOver,handleOnMouseOut}) => {
    const [isVisibleProfile,setIsVisibleProfile] = useState(false);
    const [isVisibleSpin,setIsVisibleSpin] = useState(false);
    const [isVisibleDialogDelete,setIsVisibleDialogDelete] = useState(false);
    const {user, videosFavorite} = useContext(Context);
    const[isActiveIcon,setIsActiveIcon] = useState(false);
    const handlerClickHeart = () =>{
        if(isActiveIcon)return
        if(cookiesFromFavorites.get('favoritesVideos')==null || cookiesFromFavorites.get('favoritesVideos') === undefined){
            cookiesFromFavorites.set('favoritesVideos', [], {path:'/', maxAge: 86400*360});
        }
        videosFavorite.setVideos(cookiesFromFavorites.get('favoritesVideos'));
        if(videosFavorite.videos?.filter(item => item.id === video.id).length > 0){
            notification.open({
                message: "Уведомление",
                description: "Этот лайнап уже есть в избранном"
            })
            return;
        }
        videosFavorite.setVideos([...videosFavorite?.videos,video]);
        cookiesFromFavorites.set('favoritesVideos', videosFavorite?.videos, {path:'/', maxAge: 86400*360});
        setIsActiveIcon(true);
        notification.open({
            message: "Уведомление",
            description: "Лайнап добавлен в избранное"
        })
    }
    const handleClickDeleteVideo = () =>{
        setIsVisibleSpin(true)
        VideosAPI.deleteVideo(video.id).then(data=>{
            if(data.message==="success"){
                setIsVisibleSpin(false);
                setIsVisibleDialogDelete(false);
            }
        })
    }
    return (
        <Space direction={"vertical"}>
            <Card title={video.title} size="large" style={{maxWidth:500, height: "auto", marginBottom: 12, marginRight: 3, padding: 0}}>
                <img
                    src={video.screenShotsId===0 ? video.urlOnPreview : `http://localhost:5258/api/getlineupscreenshots/${video.screenShotsId}/0`}
                    alt={video.title}
                    onClick={handleClickOnVideo}
                    onMouseOver={e=>handleOnMouseOver(e)}
                    onMouseOut={e=>handleOnMouseOut(e)}
                    style={{height:202, width:360, border: '2px solid transparent', borderRadius:'6px'}}
                />
                <br/>
                <Space direction={"horizontal"} style={{display:'flex', justifyContent:'space-between'}}>
                    <Space>
                        <Avatar src={`/api/avatar/${video.ownerId}`} alt={video.title}/>
                        <Link onClick={()=>setIsVisibleProfile(true)}>{video.ownerLogin}</Link>
                        {user.user.role === 'admin' && <Button danger style={{marginLeft:40}} onClick={()=>setIsVisibleDialogDelete(true)}>Удалить</Button>}
                    </Space>
                    {user.isAuth && <Button type="dashed" shape="circle" icon={isActiveIcon ? <HeartFilled/> : <HeartOutlined/>} onClick={handlerClickHeart}/>}
                </Space>
                {isVisibleDialogDelete &&
                    <Modal
                        title="Подтверждение"
                        open={isVisibleDialogDelete}
                        onCancel={()=>setIsVisibleDialogDelete(false)}
                        footer={[
                        <Button onClick={handleClickDeleteVideo} danger>
                            Удалить
                        </Button>,
                        <Button onClick={()=>setIsVisibleDialogDelete(false)}>
                            Закрыть
                        </Button>,
                        ]}>
                        {isVisibleSpin && <Spin/>}
                    </Modal>
                }
                {isVisibleProfile &&
                    <ModalOtherProfile loginAccount={video.ownerLogin} ownerId={video.ownerId} onClose={()=>setIsVisibleProfile(false)}/>
                }
            </Card>
        </Space>
    );
});

export default VideoForLineups;