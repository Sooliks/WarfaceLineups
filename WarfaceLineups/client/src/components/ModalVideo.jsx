import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Form, Modal, Select, Space, Typography} from "antd";
import YouTube from 'react-youtube';
import ReportsAPI from "../http/api/ReportsAPI";
import {Context} from "../index";
import Comments from "./ui/Comments";
import CommentsAPI from "../http/api/CommentsAPI";
const { Text } = Typography;

const ModalVideo = ({video, onClose}) => {
    const {user} = useContext(Context);
    const[videoId,setVideoId] = useState();
    const[comments,setComments] = useState([]);

    const [text,setText] = useState({
        type: '',
        text: ''
    });
    useEffect(()=>{
        setVideoId(video.urlOnVideo?.slice(video.urlOnVideo.lastIndexOf('=') + 1))
        CommentsAPI.getComments(video.id).then(data=>setComments(data));
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
        })
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
                <Space direction={"horizontal"} style={{display:'flex', alignItems: 'flex-start'}}>
                    <Space direction={"vertical"}>
                        <YouTube videoId={videoId}/>
                        <Comments comments={comments} lineup={video}/>
                    </Space>
                    <Space direction={"vertical"} style={{width:600}}>
                        <Space style={{display:'flex', alignItems: 'flex-start', width:'100%', justifyContent: 'space-between'}}>
                            <Card title={"Теги"} style={{width:336}}>
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
                        <Card title={"Описание"} style={{width:'100%'}}>
                            <h4>{video.description}</h4>
                        </Card>
                    </Space>
                </Space>
            </Modal>
        </div>
    );
};

export default ModalVideo;