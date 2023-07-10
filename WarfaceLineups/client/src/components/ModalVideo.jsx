import React, {useEffect, useState} from 'react';
import {Button, Card, Modal, Space} from "antd";
import YouTube from 'react-youtube';

const ModalVideo = ({video, onClose}) => {
    const[videoId,setVideoId] = useState();
    useEffect(()=>{
        setVideoId(video.urlOnVideo?.slice(video.urlOnVideo.lastIndexOf('=') + 1))
    },[])
    const getNameTypeGameMapById = (id) =>{
        switch (id){
            case 2:
                return "Переулки"
            case 3:
                return "Антенны"
            case 0:
                return "Мосты"
            case 4:
                return "Фабрика"
            case 5:
                return "Пункт Назначения"
            case 1:
                return "Пирамида"
            case 6:
                return "Окраина"
        }
    }
    const getTypeFeatureById = (id) =>{
        switch(id){
            case 4:
                return"Светошумовая граната"
            case 1:
                return"Дымовая граната"
            case 3:
                return"Коктель молотова"
            case 2:
                return"Осколочная граната"
        }
    }
    return (
        <div>
            <Modal
                title={video.title}
                centered
                open
                onCancel={onClose}
                width={1300}
                footer={[
                    <Button key="back" onClick={onClose}>
                        Закрыть
                    </Button>,
                ]}
            >
                <Space direction={"horizontal"} style={{display:'flex', alignItems: 'flex-start'}}>
                    <Space direction={"vertical"}>
                        <YouTube videoId={videoId}/>
                        <Card title={"Описание"}>
                            <h4>{video.description}</h4>
                        </Card>
                    </Space>
                    <Space direction={"vertical"}>
                        <Card title={"Теги"}>
                            <p>Карта: {getNameTypeGameMapById(video.typeGameMap)}</p>
                            <p>Граната: {getTypeFeatureById(video.typeFeature)}</p>
                            <p>Сторона: {video.typeSide ? "Защита" : "Атака"}</p>
                            <p>Плент: {video.typePlant}</p>
                        </Card>
                    </Space>
                </Space>
            </Modal>
        </div>
    );
};

export default ModalVideo;