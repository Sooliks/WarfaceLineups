import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Form, Input, Space} from "antd";
import UserAPI from "../http/api/UserAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {cookies} from "../data/Cookie";






const RegAndAuth = observer(() => {
    const{user} = useContext(Context);

    const [isVisibleByWindowId,setIsVisibleByWindowId] = useState(0); //handler swap

    const [helpAuthLogin,setHelpAuthLogin] = useState(null);
    const [validateErrorStatusAuthLogin,setErrorValidateStatusAuthLogin] = useState(null);

    const [helpRegLogin,setHelpRegLogin] = useState(null);
    const [validateErrorStatusRegLogin,setErrorValidateStatusRegLogin] = useState(null);

    const [helpRegEmail,setHelpRegEmail] = useState(null);
    const [validateErrorStatusRegEmail,setErrorValidateStatusRegEmail] = useState(null);



    useEffect(()=>{
        if(helpAuthLogin!==null){
            setErrorValidateStatusAuthLogin("error");
        }
        setTimeout(()=>{
            setHelpAuthLogin(null);
            setErrorValidateStatusAuthLogin("validating");
        },3000)
    },[helpAuthLogin])

    useEffect(()=>{
        if(helpRegLogin!==null){
            setErrorValidateStatusRegLogin("error");
        }
        setTimeout(()=>{
            setHelpRegLogin(null);
            setErrorValidateStatusRegLogin("validating");
        },3000)
    },[helpRegLogin])

    useEffect(()=>{
        if(helpRegEmail!==null){
            setErrorValidateStatusRegEmail("error");
        }
        setTimeout(()=>{
            setHelpRegEmail(null);
            setErrorValidateStatusRegEmail("validating");
        },3000)
    },[helpRegEmail])
    const onFinishAuthorization = (values) => {
        UserAPI.authorization(values.login,values.password,values.remember).then((data)=>{
            if(data.message==="errorAuth"){
                setHelpAuthLogin("Неверный логин или пароль!")
            }
            if(data.message==="successAuth"){
                user.setIsAuth(true);
                user.setUser({
                    id: data.id,
                    login: data.log,
                    role: data.role,
                    jwt: data.jwtToken,
                    isVerifiedAccount: data.isVerifiedAccount
                })
                cookies.set('jwt', data.jwtToken, { path: '/' });
                cookies.set('login', data.log, { path: '/' });
                console.log(user.login);
            }
        })
    };
    const onFinishRegistration = (values) => {
        UserAPI.registration(values.login, values.email, values.password, values.remember).then((data)=>{
            if(data.message==="errorRegEmail"){
                setHelpRegEmail("Такой email уже существует!")
            }
            if(data.message==="errorRegLogin"){
                setHelpRegLogin("Такой логин уже существует!")
            }
            if(data.message==="successReg"){
                user.setIsAuth(true);
                user.setUser({
                    id: data.userId,
                    login: data.log,
                    role: data.role,
                    jwt: data.jwtToken,
                    isVerifiedAccount: data.isVerifiedAccount
                })
                cookies.set('jwt', data.jwtToken, { path: '/' });
                cookies.set('login', data.log, { path: '/' });
            }
        })
    };
    const [formAuth,formReg] = Form.useForm();
    return (
        <div>
            {isVisibleByWindowId===0 &&
                    <Form
                        form={formAuth}
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
                        autoComplete="off"
                    >
                        <Form.Item
                            validateStatus={validateErrorStatusAuthLogin}
                            help={helpAuthLogin}
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
                    form={formReg}
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
                    autoComplete="off"
                >
                    <Form.Item
                        validateStatus={validateErrorStatusRegLogin}
                        help={helpRegLogin}
                        label="Логин"
                        name="login"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите свой логин',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('login').length >= 4) {
                                        setErrorValidateStatusRegLogin("validating");
                                        return Promise.resolve();
                                    }
                                    setErrorValidateStatusRegLogin("error");
                                    return Promise.reject(new Error('Логин должен быть больше 3-х символов!'));
                                },
                            }),
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    let re = new RegExp("^\\w[\\w.]{4,12}\\w$");
                                    if (!value || getFieldValue('login').match(re)) {
                                        setErrorValidateStatusRegLogin("validating");
                                        return Promise.resolve();
                                    }
                                    setErrorValidateStatusRegLogin("error");
                                    return Promise.reject(new Error('Введите корректный логин!'));
                                },
                            }),
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateErrorStatusRegEmail}
                        help={helpRegEmail}
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
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password').length >= 8) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароль должен быть больше 7-и символов!'));
                                },
                            }),
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
});

export default RegAndAuth;