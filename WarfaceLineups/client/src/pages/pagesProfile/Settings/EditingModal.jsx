import React, {useState} from 'react';
import {Button, Modal, Space, Upload, message} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {cookies} from "../../../data/cookies";
import {isDevelopmentMode} from "../../../conf";



const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};



const EditingModal = ({onHide}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Вы можете загрузить только JPG/PNG файл!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Картинка не должна превышать размер 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
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
                <Space direction={"vertical"} style={{display: 'flex', alignItems:'center'}}>
                    <h3>Загрузить аватар</h3>
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        headers={{
                            authorization:`${cookies.get('jwt')}`,
                            login:`${cookies.get('login')}`,
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        action={isDevelopmentMode ? `http://localhost:5258/api/uploadavatar` : `/api/uploadavatar`}
                        //customRequest={uploadAvatar}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                    border: '1px solid transparent',
                                    borderRadius: '50%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Space>
            </Modal>
        </div>
    );
};

export default EditingModal;