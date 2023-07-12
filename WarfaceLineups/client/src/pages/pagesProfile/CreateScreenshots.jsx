import React from 'react';
import {Button, Card, Form, Input, message, notification, Select, Space, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import VideosAPI from "../../http/api/VideosAPI";

const CreateScreenshots = () => {
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
                console.log("suc")
                return
            }
            if(data.message === "error"){
                console.log("err")
                return
            }
            if(data.message === ""){
                return
            }
        })
    }
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


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
                        <Form.Item label="Добавьте 3 скрина" valuePropName="fileList" name="fileList" getValueFromEvent={normFile}>
                            <Upload
                                action="http://localhost:5258/api/uploaddo"
                                listType="picture"
                                maxCount={3}
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