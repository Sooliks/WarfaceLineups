import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Modal, Row, Select, Space, Spin} from "antd";
import classes from './styles/EllipsisModal.module.css'
import UserAPI from "../../../http/api/UserAPI";
import {Context} from "../../../index";
import SettingsAPI from "../../../http/api/SettingsAPI";

const EllipsisModal = ({onHide}) => {
    const[loading,setLoading]= useState(true);
    const[currentEditingUrl,setCurrentEditingUrl] = useState();
    const[dataProfile,setDataProfile] = useState({
        lineups: [],
        mainLineup: {},
        urlOnYoutube: "",
        urlOnVk: "",
        urlOnTelegram: "",
    });
    const [mainLineupId,setMainLineupId] = useState(null);
    const [lineupsForSelect,setLineupsForSelect] = useState([]);
    const {user} = useContext(Context);
    useEffect(()=>{
        UserAPI.getDataProfileForSettings(user.user.id).then(data=>{
            setDataProfile(data);
            let newArr = [];
            for(let i=0;i<data.lineups.length;i++){
                newArr.push({value: `${data.lineups[i].id}`,label:data.lineups[i].title})
            }
            setLineupsForSelect(newArr)
            setLoading(false);
        })
    },[])

    const handleSubmitMainLineup = () => {
        SettingsAPI.changeMainLineup(mainLineupId).then(data=>{

        })
    }
    const handleSubmitChangeUrl = () => {
        switch(currentEditingUrl){
            case 'vk':
                break
            case 'tg':
                break
            case 'yt':
                break
        }
    }


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
                    <Card title={"Ссылки"} style={{width:390}}>
                        <Space direction={"vertical"} style={{display:'flex', alignItems: 'flex-start'}}>
                            <Row style={{display:'flex', alignItems: 'flex-start'}}>
                                <h3>Youtube: {dataProfile.urlOnYoutube!=="" && <p>{dataProfile.urlOnYoutube}</p>}
                                    <Button className={classes.buttonEdit} onClick={()=>setCurrentEditingUrl('yt')}>{dataProfile.urlOnTelegram!=="" ? 'Изменить' : 'Добавить'}</Button>
                                </h3>
                            </Row>
                            <Row style={{display:'flex', alignItems: 'flex-start'}}>
                                <h3>
                                    Вконтакте: {dataProfile.urlOnVk!=="" && <p>{dataProfile.urlOnVk}</p>}
                                    <Button className={classes.buttonEdit} onClick={()=>setCurrentEditingUrl('vk')}>{dataProfile.urlOnTelegram!=="" ? 'Изменить' : 'Добавить'}</Button>
                                </h3>
                            </Row>
                            <Row style={{display:'flex', alignItems: 'flex-start'}}>
                                <h3>
                                    Telegram: {dataProfile.urlOnTelegram!=="" && <p>{dataProfile.urlOnTelegram}</p>}
                                    <Button className={classes.buttonEdit} onClick={()=>setCurrentEditingUrl('tg')}>{dataProfile.urlOnTelegram!=="" ? 'Изменить' : 'Добавить'}</Button>
                                </h3>
                            </Row>
                        </Space>
                    </Card>
                    <Card title={"Главный lineup"} style={{width:390}}>
                        {loading ? <Spin size="large"/> :
                            <Space direction={"vertical"} style={{width:"100%"}}>
                                <Select
                                    defaultValue={dataProfile.mainLineup!==null && dataProfile.mainLineup.title}
                                    onChange={(value)=>setMainLineupId(value)}
                                    showSearch
                                    style={{
                                        width: "100%",
                                    }}
                                    placeholder="Ваши lineups"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={lineupsForSelect}
                                />
                                <Button style={{marginTop: 10, width: "100%"}} onClick={handleSubmitMainLineup}>Принять</Button>
                                <Modal title="Basic Modal" open={currentEditingUrl} onOk={handleSubmitChangeUrl} onCancel={()=>setCurrentEditingUrl()}>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                </Modal>
                            </Space>
                        }
                    </Card>
                </Space>
            </Modal>
        </div>
    );
};

export default EllipsisModal;