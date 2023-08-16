import React, {useContext, useState} from 'react';
import {Button, Card, Form, Input, Modal, notification, Space, Typography} from "antd";
import {Context} from "../../../index";
import UserAPI from "../../../http/api/UserAPI";


const { Text } = Typography;

const SettingsModal = ({onHide}) => {
    const handleCancel = () =>{
        setIsOpen(false);
    }
    const[isOpen,setIsOpen] = useState(false);


    const[redText,setRedText] = useState('');
    const handleClickSendEmail = () =>{
        UserAPI.getVerificationCode().then(data=>{
            setRedText(data.message);
        }).catch(e=>window.location.reload())
    }
    const [newPassword,setNewPassword] = useState();
    const handleClickChangePassword = (values) =>{
        UserAPI.changePassword(values.oldpassword).then(data=>{
            if(data.message==="success"){
                setIsOpen(true);
                setNewPassword(values.newpassword);
            }
            else{
                setRedText("Неверный пароль")
                notification.error({
                    message: "Уведомление",
                    description: "Неверный пароль"
                })
            }
        }).catch(e=>window.location.reload())
    }
    const handleClickUploadCodeOnChangePassword = (values) =>{
        UserAPI.changePasswordSubmitCode(newPassword, values.verificationCode).then(data=>{
            if(data.message === "success"){
                setIsOpen(false);
                onHide();
                notification.open({
                    message: "Уведомление",
                    description: "Пароль успешно поменян"
                })
            }
            if(data.message === "Неверный код"){
                notification.error({
                    message: "Уведомление",
                    description: "Неверный код"
                })
            }
            if(data.message==="error"){
                notification.error({
                    message: "Уведомление",
                    description: "Непридвиденная ошибка, обновите страницу"
                })
            }
        }).catch(e=>window.location.reload())
    }

    const handleClickUploadCode = (values) =>{
        UserAPI.uploadVerificationCode(values.verificationCode).then(data=>{
            if(data.result){
                notification.open({
                    message: "Уведомление",
                    description: "Аккаунт успешно верифицированн"
                })
                onHide();
                user.user.isVerifiedAccount = true;
            }
            else
            {
                notification.error({
                    message: "Уведомление",
                    description: "Неверный код"
                })
                if(data.message==="error"){
                    notification.error({
                        message: "Уведомление",
                        description: "Неизвестная ошибка"
                    })
                }
            }
        });
    }
    const {user} = useContext(Context);
    return (
        <div>
            <Modal
                width={1300}
                open={true}
                onCancel={onHide}
                footer={[
                    <Button key="back" onClick={onHide}>
                        Закрыть
                    </Button>,
                ]}
            >
                <Space direction={"horizontal"} style={{display:'flex', justifyContent: 'flex-start', alignItems:'flex-start'}}>
                    <Card style={{width:350}}>
                    {!user.user.isVerifiedAccount ?
                        <Space direction={"vertical"}>
                            <h3>Ваш аккаунт не верифицирован</h3>
                            <Button onClick={handleClickSendEmail}>Отправить код подтверждения</Button>
                            <Text type={"danger"}>{redText}</Text>
                            <Form
                                layout={"vertical"}
                                name="basic"
                                onFinish={handleClickUploadCode}
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
                        </Space>
                        :
                        <h3>Ваш аккаунт верифицирован</h3>
                    }
                    </Card>
                    <Card style={{width:350}} title={"Сменить пароль"}>
                        {!user.user.isVerifiedAccount ?
                            <h3>Сменить пароль можно только будуче верифицированным</h3>
                            :
                            <Space>
                                <Form
                                    layout={"vertical"}
                                    name="basic"
                                    onFinish={handleClickChangePassword}
                                    autoComplete="off"
                                >
                                    <Text type={"danger"}>{redText}</Text>
                                    <Form.Item
                                        label="Старый пароль"
                                        name="oldpassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Пожалуйста введите прошлый пароль',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
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
                                        <Button type="primary" htmlType="submit">Отправить</Button>
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
                                        onFinish={handleClickUploadCodeOnChangePassword}
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
                            </Space>
                        }
                    </Card>
                </Space>
            </Modal>
        </div>
    );
};

export default SettingsModal;