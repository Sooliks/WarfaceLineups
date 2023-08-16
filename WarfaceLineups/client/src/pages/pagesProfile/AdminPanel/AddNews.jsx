import React, {useState} from 'react';
import {Button, Form, Input, Result} from "antd";
import TextArea from "antd/es/input/TextArea";
import NewsAPI from "../../../http/api/NewsAPI";
import {useNavigate} from "react-router-dom";

const AddNews = () => {
    const navigate = useNavigate();
    const[isVisibleResult,setIsVisibleResult] = useState('');
    const onFinish = (values) => {
        NewsAPI.publishNews(values).then(data=>{
            setIsVisibleResult(data.message)
        }).catch(e=>window.location.reload())
    };
    if(isVisibleResult === 'success'){
        return <Result
            status="success"
            title="Новость добавлена"
            extra={[
                <Button type="primary" key="console" onClick={()=>{navigate('/news');window.location.reload();}}>
                    Перейти в новости
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
                    Обновить страницу
                </Button>,
            ]}
        />
    }
    return (
        <div>
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
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Заголовок"
                    name="title"
                    rules={[{ required: true, message: 'Пожалуйста введите заголовок!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Текст"
                    name="text"
                    rules={[{ required: true, message: 'Пожалуйста введите текст!' }]}
                >
                    <TextArea showCount maxLength={400} style={{ height: 200, resize: 'none' }}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddNews;