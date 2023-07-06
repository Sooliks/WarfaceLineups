import React, {useContext, useEffect} from 'react';

import {Button} from "antd";
import {Context} from "../index";





const Premium = () => {
    const {user} = useContext(Context);
    return (
        <div>
            <form method="POST" action="https://yoomoney.ru/quickpay/confirm">
                <input type="hidden" name="receiver" value="4100116427707678"/>
                <input type="hidden" name="label" value={user.user.login}/>
                <input type="hidden" name="quickpay-form" value="button"/>
                <input type="hidden" name="sum" value="350" datatype="number"/>
                <Button htmlType="submit">Купить Premium</Button>
            </form>
        </div>
    );
};

export default Premium;