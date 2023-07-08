import React, {useContext} from 'react';

import {Button, Card, Space, Typography} from "antd";
import {Context} from "../index";
const { Text } = Typography;




const Premium = () => {
    const {user} = useContext(Context);
    return (
        <div>
            <Card style={{marginTop:20}}>
                <Space direction={"vertical"}>
                    <h1 style={{textAlign: "center"}}>Преимущество премиум аккаунта</h1>
                    <Card style={{width:500, marginBottom:20}}>
                        <h2>Без рекламы</h2>
                        <Text type="secondary">Наслаждайтесь сайтом без ограничений</Text>
                    </Card>
                    <Card style={{width:500, marginBottom:20}}>
                        <h2>Ограничения сняты</h2>
                        <Text type="secondary">Получайте доступ ко всем материалам и функциям сайта</Text>
                    </Card>
                    <Card style={{width:500, marginBottom:20}}>
                        <h2>Эксклюзивный контент</h2>
                        <Text type="secondary">Получите доступ к уникальному контенту в будущем для премиум пользователей</Text>
                    </Card>
                    <Card style={{width:500, marginBottom:20}}>
                        <h2>Поддержите сайт</h2>
                        <Text type="secondary">Благодаря двум покупкам Premium вы можете продлить существование сайта на месяц</Text>
                    </Card>
                    <form method="POST" action="https://yoomoney.ru/quickpay/confirm">
                        <input type="hidden" name="receiver" value="4100116427707678"/>
                        <input type="hidden" name="label" value={user.user.login}/>
                        <input type="hidden" name="quickpay-form" value="button"/>
                        <input type="hidden" name="sum" value="250" datatype="number"/>
                        <Button htmlType="submit" shape="round" size={"large"} style={{width:500}} disabled={!user.isAuth}>Купить Premium</Button>
                    </form>
                </Space>
            </Card>
        </div>
    );
};

export default Premium;