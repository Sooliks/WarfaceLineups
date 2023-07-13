import React, {useState} from 'react';
import {Button, Card, Form, Input, message, notification, Result, Select, Space, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {UploadOutlined} from "@ant-design/icons";
import VideosAPI from "../../http/api/VideosAPI";
import {useNavigate} from "react-router-dom";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const CreateScreenshots = () => {
    const navigate = useNavigate();
    const [isVisibleResult,setIsVisibleResult] = useState('');
    const beforeUpload = (file,fileList) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Вы можете загрузить только JPG/PNG файл!');
            fileList.filter(f=>f===file)
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Картинка не должна превышать размер 2MB!');
            fileList.filter(f=>f===file)
        }
        return isJpgOrPng && isLt2M;
    };
    const handlerOnFinish = (values) =>{
        const formData = new FormData();
        if(values.fileList.length<2){
            notification.error({
                message: "Уведомление",
                description: "Добавьте 3 скрина"
            })
            return
        }
        formData.append('file1', values.fileList[0].originFileObj);
        formData.append('file2', values.fileList[1].originFileObj);
        formData.append('file3', values.fileList[2].originFileObj);
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('typeGameMap', values.typeGameMap);
        formData.append('typeSide', values.typeSide);
        formData.append('typeFeature', values.typeFeature);
        formData.append('typePlant', values.typePlant);
        VideosAPI.uploadLineupWithScreenshots(formData).then(data=>{
            if(data.message === "success"){
                setIsVisibleResult('success')
                return
            }
            if(data.message === "error"){
                setIsVisibleResult('error')
                return
            }
            if(data.message === "notformat"){
                setIsVisibleResult('notformat');
                return;
            }
            setIsVisibleResult('error');
        })
    }
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
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
    if(isVisibleResult === 'notformat'){
        return <Result
            status="error"
            title="Неверный формат"
            subTitle="Скрины должны быть формата jpg или png и меньше 2 MB"
            extra={[
                <Button type="primary" key="console" onClick={()=>{navigate('/profile');window.location.reload();}}>
                    Перейти в профиль
                </Button>,
            ]}
        />
    }
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


    return (
        <Space>
            <Card title={"Создание при помощи скриншотов"} style={{width:1069}}>
                <Space style={{width:600}}>
                    <Form
                        encType="multipart/form-data"
                        action={"http://localhost:5258/api/uploadlineupwithscreenshots"}
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
                            name="typePlant"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста выберите тип плента!',
                                },
                            ]}
                        >
                            <Select
                                style={{width: '100%'}}
                                placeholder="Выберите плент"
                                size={"large"}
                                className={"typePlant"}
                                options={[
                                    { value: 1, label: '1' },
                                    { value: 2, label: '2' },
                                ]}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            />
                        </Form.Item>

                        <Form.Item label="Добавьте 3 скрина" name="fileList" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload
                                action="http://localhost:5258/api/uploaddo"
                                listType="picture"
                                maxCount={3}
                                multiple
                                beforeUpload={beforeUpload}
                            >
                                <Button icon={<UploadOutlined />} style={{width: '100%'}}>Добавить</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" size={"large"} style={{width:'100%'}}>Отправить на проверку</Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
        </Space>
    );
};

export default CreateScreenshots;