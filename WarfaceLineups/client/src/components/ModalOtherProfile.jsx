import React, {useEffect, useState} from 'react';
import {Card, Image, Modal, Space} from "antd";

const ModalOtherProfile = ({loginAccount,onClose}) => {
    const [dataProfile,setDataProfile] = useState();

    useEffect(()=>{

    },[])


    return (
        <div>
            <Modal
                title={"Профиль пользователя: "+loginAccount}
                centered
                open
                onCancel={onClose}
                width={1300}
                footer={[

                ]}
            >
                <Space direction={"vertical"} style={{display:'flex', alignItems: 'flex-start'}}>

                </Space>
            </Modal>
        </div>
    );
};

export default ModalOtherProfile;