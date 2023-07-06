import React, {useContext, useEffect, useState} from 'react';
import {Badge, Descriptions} from "antd";
import {Context} from "../../index";




const Info = () => {
    const {user} = useContext(Context);
    return (
        <div>
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="Логин">{user.user.login}</Descriptions.Item>
                <Descriptions.Item label="Премиум">{user.user.isPremiumAccount ? 'Есть' : 'Нету'}</Descriptions.Item>
                <Descriptions.Item label="Роль">{user.user.role}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default Info;