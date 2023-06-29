import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Input, Space} from "antd";





function RegAndAuth() {
    const [isVisibleByWindowId,setIsVisibleByWindowId] = useState(0); //handler swap window

    //auth
    const onFinishAuthorization = (values) => {
        console.log(values);
        console.log('Success:', values);
    };
    const onFinishFailedAuthorization = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handlerChangeAuthorizationForm = (e) =>{

    }
    /////////////////////////
    //reg
    const onFinishRegistration = (values) => {
        if(values.login.length < 4){
            console.log('4');
            return
        }
        console.log('Success:', values);
    };
    const onFinishFailedRegistration = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handlerChangeRegistrationForm = (e) =>{

    }
    ///////////////////////
    return (
        <div>
            {isVisibleByWindowId===0 &&
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                            width:600
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishAuthorization}
                        onFinishFailed={onFinishFailedAuthorization}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Логин"
                            name="login"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста введите свой логин',
                                },
                            ]}
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста введите свой пароль!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                            <Space style={{display:'flex', justifyContent: 'space-between'}}>
                                <Button type="primary" htmlType="submit">Войти</Button>
                                <Button onClick={()=>setIsVisibleByWindowId(1)}>Регистрация</Button>
                            </Space>
                        </Form.Item>
                    </Form>
            }
            {isVisibleByWindowId === 1 &&
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                        width:600
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishRegistration}
                    onFinishFailed={onFinishFailedRegistration}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Логин"
                        name="login"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите свой логин',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('login').length > 3) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Логин должен быть больше 3-х символов!'));
                                },
                            }),
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    let re = new RegExp("^\\w[\\w.]{4,12}\\w$");
                                    if (!value || getFieldValue('login').match(re)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Введите корректный логин!'));
                                },
                            }),
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Введите корректный email!',
                            },
                            {
                                required: true,
                                message: 'Пожалуйста введите свою почту!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите свой пароль!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Подтвердите пароль"
                        name="secondPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста подтвердите пароль',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                        <Space style={{display:'flex', justifyContent: 'space-between'}}>
                            <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
                            <Button onClick={()=>setIsVisibleByWindowId(0)}>Войти в существующий аккаунт</Button>
                        </Space>
                    </Form.Item>
                </Form>
            }
        </div>
    );
}

export default RegAndAuth;