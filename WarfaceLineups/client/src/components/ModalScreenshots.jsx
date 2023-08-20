import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Form, Image, Modal, Select, Space, Typography} from "antd";
import {Context} from "../index";
import ReportsAPI from "../http/api/ReportsAPI";
import Comments from "./ui/Comments";
import {isDevelopmentMode} from "../conf";
import {useNavigate} from "react-router-dom";
const { Text } = Typography;

const ModalScreenshots = ({video, onClose, changeUrl = false}) => {
    const navigate = useNavigate();

    useEffect(()=>{
        if(video.isVerified  && changeUrl) navigate(`/lineups/${video.id}`)
    },[])


    const {user} = useContext(Context);
    const [text,setText] = useState({
        type: '',
        text: ''
    });
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
    const handleClickReport = (values) => {
        ReportsAPI.addReport(video.id,values.reportSelect).then(data=>{
            if(data.message === "success"){
                setText({...text,
                    text:"Успешно отравлено",
                    type: 'success'
                })
                return
            }
            if(data.message === "exists"){
                setText({...text,
                    text:"Вы уже отправляли репорт на этот лайнап",
                    type: 'danger'
                })
                return
            }
            if(data.message === "error"){
                setText({...text,
                    text:"Неизвестная ошибка",
                    type: 'danger'
                })
                return
            }
            if(data.message === "yours"){
                setText({...text,
                    text:"Это ваш лайнап!",
                    type: 'danger'
                })
                return
            }
        }).catch(e=>window.location.reload())
    }

    return (
        <div>
            <Modal
                title={video.title}
                centered
                open
                onCancel={()=>{
                    onClose()
                    if(video.isVerified  && changeUrl) navigate('/lineups');
                }}
                width={1300}
                footer={[

                ]}
            >
                <Space direction={"vertical"} style={{display:'flex', alignItems: 'flex-start'}}>
                    <Space direction={"horizontal"} style={{width:1242,display:'flex', alignItems: 'flex-start', justifyContent:'space-between'}}>
                        <Card>
                            <Image width={200} src={isDevelopmentMode ? `http://localhost:5258/api/getlineupscreenshots/${video.screenShotsId}/0` : `/api/getlineupscreenshots/${video.screenShotsId}/0`}/>
                        </Card>
                        <Card>
                            <Image width={200} src={isDevelopmentMode ? `http://localhost:5258/api/getlineupscreenshots/${video.screenShotsId}/1` : `/api/getlineupscreenshots/${video.screenShotsId}/1`}/>
                        </Card>
                        <Card>
                            <Image width={200} src={isDevelopmentMode ? `http://localhost:5258/api/getlineupscreenshots/${video.screenShotsId}/2` : `/api/getlineupscreenshots/${video.screenShotsId}/2`}/>
                        </Card>
                    </Space>
                    <Space style={{width:1242, alignItems:'flex-start', justifyContent:'space-between'}}>
                        <Space direction={"vertical"}>
                            <Card title={"Описание"} style={{width:642}}>
                                <Text>{video.description}</Text>
                            </Card>
                            <Comments lineup={video}/>
                        </Space>
                        <Space direction={"horizontal"} style={{width:'100%',alignItems:'flex-start', justifyContent:'space-between'}}>
                            <Card title={"Теги"} style={{width:330}}>
                                <p>Карта: {getNameTypeGameMapById(video.typeGameMap)}</p>
                                <p>Граната: {getTypeFeatureById(video.typeFeature)}</p>
                                <p>Сторона: {video.typeSide ? "Защита" : "Атака"}</p>
                                <p>Плент: {video.typePlant}</p>
                            </Card>
                            {user.isAuth &&
                                <Card title={"Пожаловаться"} style={{width: 255}}>
                                    {text.text === '' ?
                                        <Form
                                            layout={"vertical"}
                                            name="basic"
                                            onFinish={handleClickReport}
                                            autoComplete="off"
                                        >
                                            <Form.Item
                                                label=""
                                                name="reportSelect"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Пожалуйста выберите нарушение',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    placeholder={"Выберите нарушение"}
                                                    style={{width: '100%'}}
                                                    options={[
                                                        {value: 'tags', label: 'Теги не соответвуют'},
                                                        {value: 'dontWork', label: 'Lineup не работает'},
                                                        {value: 'other', label: 'Другое'},
                                                    ]}
                                                />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button htmlType="submit" style={{width: '100%'}}>Отправить</Button>
                                            </Form.Item>
                                        </Form>
                                        :
                                        <Text type={text.type}>{text.text}</Text>
                                    }
                                </Card>
                            }
                        </Space>
                    </Space>
                </Space>
            </Modal>
        </div>
    );
};

export default ModalScreenshots;