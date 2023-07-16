import React, {useState} from 'react';
import {Card, Modal, Space} from "antd";

const EllipsisModal = ({onHide}) => {
    const[dataProfile,setDataProfile] = useState();

    return (
        <div>
            <Modal
                centered
                open
                onCancel={onHide}
                width={1300}
                footer={[

                ]}
            >
                <Space direction={"horizontal"} style={{display:'flex', alignItems: 'flex-start'}}>
                    <Card title={"Соц сети"} style={{width:360}}>

                    </Card>
                    <Card title={"Главный lineup"} style={{width:360}}>

                    </Card>
                </Space>
            </Modal>
        </div>
    );
};

export default EllipsisModal;