import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Button, Card, Input, Modal, Row, Select, Space, Spin, Tooltip, Typography} from "antd";
import classes from './styles/EllipsisModal.module.css'
import UserAPI from "../../../http/api/UserAPI";
import {Context} from "../../../index";
import SettingsAPI from "../../../http/api/SettingsAPI";
import VideoPreview from "../../../components/VideoPreview";
import VideosAPI from "../../../http/api/VideosAPI";
import {CloseOutlined} from "@ant-design/icons";
const { Link, Text } = Typography;

const EllipsisModal = ({onHide}) => {
    const[errorText,setErrorText] = useState('');
    const[loading,setLoading]= useState(true);
    const[currentEditingUrl,setCurrentEditingUrl] = useState();
    const [url,setUrl] = useState('');
    const[dataProfile,setDataProfile] = useState({
        lineups: [],
        mainLineup: {},
        urlOnYoutube: "",
        urlOnVk: "",
        urlOnTelegram: "",
    });
    const [mainLineupId,setMainLineupId] = useState(0);
    useEffect(()=>{
        if(mainLineupId===null)return
        VideosAPI.getLineupById(mainLineupId).then(data => {
            setDataProfile({...dataProfile, mainLineup: data})
        }).catch(e=>window.location.reload())
    },[mainLineupId])
    const [lineupsForSelect,setLineupsForSelect] = useState([]);
    const {user} = useContext(Context);
    useEffect(()=>{
        UserAPI.getDataProfileForSettings(user.user.id).then(data => {
            setDataProfile(data);
            let newArr = [];
            for (let i = 0; i < data.lineups.length; i++) {
                newArr.push({value: `${data.lineups[i].id}`, label: data.lineups[i].title})
            }
            newArr.unshift({value: 0, label: "Нету"})
            setLineupsForSelect(newArr)
            setLoading(false);
        }).catch(e=>window.location.reload())
    },[])

    const handleSubmitMainLineup = () => {
        SettingsAPI.changeMainLineup(mainLineupId).then(data=>{
            if(data.message==="success"){
                onHide();
            }
        }).catch(e=>window.location.reload())
    }
    const handleResponse = (data) =>{
        if(data.message === "success") {
            setCurrentEditingUrl()
            setUrl()
            onHide();
            setErrorText('');
        }
    }


    const handleSubmitChangeUrl = () => {
        switch(currentEditingUrl){
            case 'ВКонтакте':
                if(!url.startsWith("https://vk.com/")){
                    setErrorText("Ссылка должна быть на ВКонтакте")
                    return
                }
                SettingsAPI.changeUrlOnVk(url).then(data=>{
                    handleResponse(data);
                })
                break
            case 'Telegram':
                if(!url.startsWith("https://t.me/")){
                    setErrorText("Ссылка должна быть на Telegram")
                    return
                }
                SettingsAPI.changeUrlOnTelegram(url).then(data=>{
                    handleResponse(data);
                })
                break
            case 'Youtube':
                if(!url.startsWith("https://www.youtube.com/")){
                    setErrorText("Ссылка должна быть на Youtube канал")
                    return
                }
                SettingsAPI.changeUrlOnYoutube(url).then(data=>{
                    handleResponse(data);
                })
                break
        }
    }

    const dropUrl = (current) => {
        switch(current){
            case 'ВКонтакте':
                SettingsAPI.changeUrlOnVk("").then(data=>{
                    handleResponse(data);
                })
                break
            case 'Telegram':
                SettingsAPI.changeUrlOnTelegram("").then(data=>{
                    handleResponse(data);
                })
                break
            case 'Youtube':
                SettingsAPI.changeUrlOnYoutube("").then(data=>{
                    handleResponse(data);
                })
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
                    <Card title={"Ссылки"} style={{width:710}}>
                        <Space direction={"vertical"} style={{display:'flex', alignItems: 'flex-start'}}>
                            <Row style={{display:'flex', alignItems: 'flex-start'}}>
                                <h3>
                                    {'Youtube:'} {dataProfile.urlOnYoutube!=="" && <Link href={dataProfile.urlOnYoutube} target="_blank">{dataProfile.urlOnYoutube}</Link>}
                                    <Button className={classes.buttonEdit} onClick={()=>setCurrentEditingUrl('Youtube')}>{dataProfile.urlOnYoutube!=="" ? 'Изменить' : 'Добавить'}</Button>
                                    {dataProfile.urlOnYoutube!=="" && <Tooltip placement="topLeft" title={"Удалить"}> <Button icon={<CloseOutlined />} style={{width: 32, height: 32}} onClick={()=>dropUrl('Youtube')}/> </Tooltip>}
                                </h3>
                            </Row>
                            <Row style={{display:'flex', alignItems: 'flex-start'}}>
                                <h3>
                                    {'Вконтакте:'} {dataProfile.urlOnVk!=="" && <Link href={dataProfile.urlOnVk} target="_blank">{dataProfile.urlOnVk}</Link>}
                                    <Button className={classes.buttonEdit} onClick={()=>setCurrentEditingUrl('ВКонтакте')}>{dataProfile.urlOnVk!=="" ? 'Изменить' : 'Добавить'}</Button>
                                    {dataProfile.urlOnVk!=="" && <Tooltip placement="topLeft" title={"Удалить"}> <Button icon={<CloseOutlined />} style={{width: 32, height: 32}} onClick={()=>dropUrl('ВКонтакте')}/> </Tooltip>}
                                </h3>
                            </Row>
                            <Row style={{display:'flex', alignItems: 'flex-start'}}>
                                <h3>
                                    {'Telegram:'} {dataProfile.urlOnTelegram!=="" && <Link href={dataProfile.urlOnTelegram} target="_blank">{dataProfile.urlOnTelegram}</Link>}
                                    <Button className={classes.buttonEdit} onClick={()=>setCurrentEditingUrl('Telegram')}>{dataProfile.urlOnTelegram!=="" ? 'Изменить' : 'Добавить'}</Button>
                                    {dataProfile.urlOnTelegram!=="" && <Tooltip placement="topLeft" title={"Удалить"}> <Button icon={<CloseOutlined size={"small"} />} style={{width: 32, height: 32}} onClick={()=>dropUrl('Telegram')}/> </Tooltip>}
                                </h3>
                            </Row>
                        </Space>
                    </Card>
                    <Card title={"Главный lineup"} style={{width:442}}>
                        {loading ? <Spin size="large"/> :
                            <Space direction={"vertical"} style={{width:"100%"}}>
                                <Select
                                    defaultValue={dataProfile.mainLineup!==null ? dataProfile.mainLineup.title : 0}
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
                                {dataProfile.mainLineup !== null &&
                                    <VideoPreview type={"uservideo"} video={dataProfile.mainLineup} videoPreview={false}/>
                                }
                                <Button style={{marginTop: 10, width: "100%"}} onClick={handleSubmitMainLineup}>Принять</Button>
                                <Modal title={""} open={currentEditingUrl} onOk={handleSubmitChangeUrl} onCancel={()=>setCurrentEditingUrl()}>
                                    <Space style={{marginTop: 30, width: "100%"}} direction={"vertical"}>
                                        <Text type={"danger"}>{errorText}</Text>
                                        <Input placeholder={`Ссылка на ${currentEditingUrl}`} onChange={(value)=>setUrl(value.target.value)} value={url} />
                                    </Space>
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