import React, {useState} from 'react';
import {Button, Modal, Space} from "antd";

const SettingsModal = ({onHide}) => {
    return (
        <div>
            <Modal
                open={true}
                onCancel={onHide}
                footer={[
                    <Button key="back" onClick={onHide}>
                        Закрыть
                    </Button>,
                ]}
            >
                <Space>

                </Space>
            </Modal>
        </div>
    );
};

export default SettingsModal;