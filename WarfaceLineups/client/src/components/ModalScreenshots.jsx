import React from 'react';
import {Button, Card, Image, Modal, Space} from "antd";
import YouTube from "react-youtube";

const ModalScreenshots = ({video, onClose}) => {
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

                ]}
            >
                <Space direction={"vertical"} style={{display:'flex', alignItems: 'flex-start'}}>
                    <Space direction={"horizontal"} style={{width:1242,display:'flex', alignItems: 'flex-start', justifyContent:'space-around'}}>
                        <Card style={{height:250}}>
                            <Image width={200} src={`http://localhost:5258/api/getlineupscreenshots/${video.id}/0`}/>
                        </Card>
                        <Card style={{height:250}}>
                            <Image width={200} src={`http://localhost:5258/api/getlineupscreenshots/${video.id}/1`}/>
                        </Card>
                        <Card style={{height:250}}>
                            <Image width={200} src={`http://localhost:5258/api/getlineupscreenshots/${video.id}/2`}/>
                        </Card>
                    </Space>
                    <Card title={"Описание"} style={{width:1242}}>
                        <h4>{video.description}</h4>
                    </Card>
                    <Space direction={"vertical"}>
                        <Card title={"Теги"} style={{width:1242}}>
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

export default ModalScreenshots;