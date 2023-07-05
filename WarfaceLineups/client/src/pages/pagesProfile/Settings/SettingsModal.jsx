import React, {useContext, useState} from 'react';
import {Button, Card, Checkbox, Form, Input, Modal, notification, Space, Typography} from "antd";
import {Context} from "../../../index";
import UserAPI from "../../../http/api/UserAPI";


const { Text } = Typography;

const SettingsModal = ({onHide}) => {
    const[redText,setRedText] = useState('');
    const handleClickSendEmail = () =>{
        UserAPI.getVerificationCode().then(data=>{
            setRedText(data.message);
        })
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
                <Space direction={"vertical"} style={{display:'flex'}}>
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
                </Space>
            </Modal>
        </div>
    );
};

export default SettingsModal;