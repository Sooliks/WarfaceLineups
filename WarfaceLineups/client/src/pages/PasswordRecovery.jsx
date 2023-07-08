import React, {useState} from 'react';
import {Button, Card, Form, Input, Modal, notification, Space, Typography} from "antd";
import classes from './styles/Profile.module.css'
import UserAPI from "../http/api/UserAPI";
import {useNavigate} from "react-router-dom";

const { Text } = Typography;

const PasswordRecovery = () => {
    const navigate = useNavigate();
    const [jwt,setJwt] = useState();
    const [login,setLogin] = useState();
    const [redTextEmail,setRedTextEmail] = useState('');
    const [email,setEmail] = useState('');
    const [isOpen,setIsOpen] = useState(false);
    const [isOpenPassword,setIsOpenPassword] = useState(false);
    //1
    const handleFinishEmail = (values) => {
        UserAPI.recoveryPasswordGetVerificationCode(values.email).then(data=>{
            if(data.message === "success"){
                setEmail(values.email);
                setIsOpen(true);
            }
            else {
                setRedTextEmail(data.message);
            }
        })
    }
    //2
    const handleUploadCode = (values) => {
        UserAPI.recoveryPasswordUploadVerificationCode(values.verificationCode,email).then(data=>{
            if(data.message === "success"){
                setJwt(data.token);
                setLogin(data.login);
                setIsOpenPassword(true);
                return;
            }
            if(data.message === "error"){
                notification.error({
                    message: "Уведомление",
                    description: "Неверный код"
                })
            }
            else {
                notification.error({
                    message: "Уведомление",
                    description: data.message
                })
            }
        })
    }
    //3
    const handleUploadPasswords = (values) =>{
        UserAPI.recoveryPasswordUploadNewPassword(jwt,login,values.newpassword).then(data=>{
            if(data.message === "success"){
                notification.open({
                    message: "Уведомление",
                    description: "Вы успешно сменили пароль"
                })
                setIsOpenPassword(false);
                setIsOpen(false);
                navigate("/profile");
            }
            else{
                notification.error({
                    message: "Уведомление",
                    description: "Ошибка"
                })
            }
        })
    }
    const handleCancel = () =>{
        setIsOpen(false);
    }
    const handleCancelPassword = () =>{
        setIsOpenPassword(false);
    }

    return (
        <Space>
            <Card className={classes.l}>
                <Form
                    layout={"vertical"}
                    name="basic"
                    onFinish={handleFinishEmail}
                    autoComplete="off"
                    style={{width:350}}
                >
                    <Form.Item
                        label="Ваш email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Text type={"danger"}>{redTextEmail}</Text>
                    <Form.Item>
                        <Button htmlType="submit" style={{width:350}}>Отправить</Button>
                    </Form.Item>
                </Form>
                <Modal
                    open={isOpen}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Закрыть
                        </Button>,
                    ]}
                >
                    <Form
                        layout={"vertical"}
                        name="basic"
                        onFinish={handleUploadCode}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Код подтверждения"
                            name="verificationCode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста введите код подтверждения',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Проверить</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    open={isOpenPassword}
                    onCancel={handleCancelPassword}
                    footer={[
                        <Button key="back" onClick={handleCancelPassword}>
                            Закрыть
                        </Button>,
                    ]}
                >
                    <Form
                        layout={"vertical"}
                        name="basic"
                        onFinish={handleUploadPasswords}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Новый пароль"
                            name="newpassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста введите новый пароль',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newpassword').length >= 8) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Пароль должен быть больше 7-и символов!'));
                                    },
                                }),
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('oldpassword') === value) {
                                            return Promise.reject(new Error('Новый пароль не должен быть такой же как старый!'));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Подтвердите пароль"
                            name="newpasswordsecond"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста подтвердите пароль',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newpassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Пароли не совпадают!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Проверить</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </Space>
    );
};

export default PasswordRecovery;