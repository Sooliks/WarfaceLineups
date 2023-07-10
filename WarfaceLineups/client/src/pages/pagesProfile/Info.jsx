import React, {useContext} from 'react';
import {Descriptions} from "antd";
import {Context} from "../../index";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";




const Info = () => {
    const {user} = useContext(Context);
    return (
        <div>
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="Логин">{user.user.login}</Descriptions.Item>
                <Descriptions.Item label="Премиум">{user.user.isPremiumAccount ? <CheckOutlined /> : <CloseOutlined />}</Descriptions.Item>
                <Descriptions.Item label="Роль">{user.user.role}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default Info;