import React from 'react';
import {Button, Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";

const AddNews = () => {
    const onFinish = (values) => {

    };
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