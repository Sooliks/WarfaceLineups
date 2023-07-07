import React, {useState} from 'react';
import {Button, Card, Form, Input, Result, Select, Space} from "antd";
import TextArea from "antd/es/input/TextArea";
import VideosAPI from "../../http/api/VideosAPI";
import {useNavigate} from "react-router-dom";


const CreateVideo = () => {
    const navigate = useNavigate();
    const [urlOnPreview,setUrlOnPreview] = useState(null);
    const[isVisibleResult,setIsVisibleResult] = useState('');
    if(isVisibleResult === 'success'){
        return <Result
            status="success"
            title="Видео успешно отправлено"
            subTitle="Ожидайте проверки модерации"
            extra={[
                <Button type="primary" key="console" onClick={()=>{navigate('/profile');window.location.reload();}}>
                    Перейти в профиль
                </Button>,
            ]}
        />
    }
    if(isVisibleResult === 'warning'){
        return <Result
            status="warning"
            title="Такое видео уже есть"
            subTitle="Попробуйте еще раз"
            extra={[
                <Button type="primary" key="console" onClick={()=>{navigate('/profile');window.location.reload();}}>
                    Перейти в профиль
                </Button>,
            ]}
        />
    }
    if(isVisibleResult === 'error'){
        return <Result
            status="error"
            title="Неизвестная ошибка"
            subTitle="Попробуйте еще раз"
            extra={[
                <Button type="primary" key="console" onClick={()=>{navigate('/profile');window.location.reload();}}>
                    Перейти в профиль
                </Button>,
            ]}
        />
    }
    if(isVisibleResult === 'notverified'){
        return <Result
            status="warning"
            title="У вас не верифицирован аккаунт"
            subTitle="Подтвердите аккаунт в настройках"
            extra={[
                <Button type="primary" key="console" onClick={()=>{navigate('/profile');window.location.reload();}}>
                    Перейти в профиль
                </Button>,
            ]}
        />
    }
    const handlerOnFinish = (values) =>{
        VideosAPI.uploadVideo(values).then(data=>{
            console.log(data.message)
            if(data.message==="success"){
                setIsVisibleResult('success')
                return
            }
            if(data.message==="videoIsDuplicate"){
                setIsVisibleResult('warning')
                return
            }
            if(data.message==="error"){
                setIsVisibleResult('error')
                return
            }
            if(data.message==="notverified"){
                setIsVisibleResult('notverified')
                return
            }
            setIsVisibleResult('error')
        })
    }
    return (
        <Space>
            <Card title={"Создание видео"} style={{width:1069}}>
                <Space direction={"horizontal"} style={{display:'flex', justifyContent: 'flex-start', alignItems:'flex-start'}}>
                    <Space style={{width:600}}>
                        <Form
                            layout={"vertical"}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                width:600
                            }}
                            initialValues={{
                                //remember: true,
                            }}
                            onFinish={handlerOnFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Название"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста введите название!',
                                    },
                                ]}
                            >
                                <Input  />
                            </Form.Item>
                            <Form.Item
                                label="Описание"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста введите описание!',
                                    },
                                ]}
                            >
                                <TextArea showCount maxLength={300} style={{ height: 140, resize: 'none' }}/>
                            </Form.Item>
                            <Form.Item
                                name="typeGameMap"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста выберите карту!',
                                    },
                                ]}
                            >
                                <Select
                                    style={{width: '100%'}}
                                    placeholder="Выберите карту"
                                    size={"large"}
                                    className={"filterMap"}
                                    options={[
                                        { value: 0, label: 'Мосты' },
                                        { value: 1, label: 'Пирамида' },
                                        { value: 2, label: 'Переулки' },
                                        { value: 3, label: 'Антенны' },
                                        { value: 4, label: 'Фабрика' },
                                        { value: 5, label: 'Пункт Назначения' },
                                        { value: 6, label: 'Окраина' },
                                    ]}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    showSearch
                                />
                            </Form.Item>
                            <Form.Item
                                name="typeSide"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста выберите сторону!',
                                    },
                                ]}
                            >
                                <Select
                                    style={{width: '100%'}}
                                    placeholder="Выберите сторону"
                                    size={"large"}
                                    className={"filterMap"}
                                    options={[
                                        { value: 0, label: 'Атака' },
                                        { value: 1, label: 'Защита' },
                                    ]}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }

                                />
                            </Form.Item>
                            <Form.Item
                                name="typeFeature"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста выберите тип гранаты!',
                                    },
                                ]}
                            >
                                <Select
                                    style={{width: '100%'}}
                                    placeholder="Выберите тип гранаты"
                                    size={"large"}
                                    className={"filterMap"}
                                    options={[
                                        { value: 1, label: 'Дымовая граната' },
                                        { value: 2, label: 'Осколочная граната' },
                                        { value: 3, label: 'Коктель молотова' },
                                        { value: 4, label: 'Светошумовая граната' },
                                    ]}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                label="Ссылка на видео с Youtube"
                                name="urlOnVideo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста введите ссылку на видео!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || (getFieldValue('urlOnVideo').split('=')[0]==='https://www.youtube.com/watch?v'&&getFieldValue('urlOnVideo').split('=')[1].length===11)) {
                                                setUrlOnPreview(`https://i.ytimg.com/vi/${getFieldValue('urlOnVideo').split('=')[1]}/maxresdefault.jpg`);
                                                return Promise.resolve();
                                            }
                                            setUrlOnPreview(null);
                                            return Promise.reject(new Error('Ссылка должна быть на видео с Youtube!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input  />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit">Отправить на проверку</Button>
                            </Form.Item>
                        </Form>
                    </Space>
                    <Space>
                        {urlOnPreview &&
                            <Card title={"Превью"}>
                                <img src={urlOnPreview} alt={urlOnPreview} style={{width: 360, height: 202}}/>
                            </Card>
                        }
                    </Space>
                </Space>
            </Card>
        </Space>
    );
};

export default CreateVideo;