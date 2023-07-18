import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Input, Modal, Row, Select, Space, Spin, Typography} from "antd";
import classes from './styles/EllipsisModal.module.css'
import UserAPI from "../../../http/api/UserAPI";
import {Context} from "../../../index";
import SettingsAPI from "../../../http/api/SettingsAPI";
import VideoPreview from "../../../components/VideoPreview";
import VideosAPI from "../../../http/api/VideosAPI";
const { Link } = Typography;

const EllipsisModal = ({onHide}) => {
    const[loading,setLoading]= useState(true);
    const[currentEditingUrl,setCurrentEditingUrl] = useState();
    const [url,setUrl] = useState();
    const[dataProfile,setDataProfile] = useState({
        lineups: [],
        mainLineup: {},
        urlOnYoutube: "",
        urlOnVk: "",
        urlOnTelegram: "",
    });
    const [mainLineupId,setMainLineupId] = useState(null);
    useEffect(()=>{
        if(mainLineupId===null)return
        VideosAPI.getLineupById(mainLineupId).then(data=>{
            setDataProfile({...dataProfile,mainLineup: data})
        })
    },[mainLineupId])
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
            if(data.message==="success"){
                onHide();
            }
        })
    }
    const handleSubmitChangeUrl = () => {
        const handleResponse = (data) =>{
            if(data.message === "success") {
                setCurrentEditingUrl()
                setUrl()
                onHide();
            }
        }
        switch(currentEditingUrl){
            case 'ВКонтакте':
                SettingsAPI.changeUrlOnVk(url).then(data=>{
                    handleResponse(data);
                })
                break
            case 'Telegram':
                SettingsAPI.changeUrlOnTelegram(url).then(data=>{
                    handleResponse(data);
                })
                break
            case 'Youtube':
                SettingsAPI.changeUrlOnYoutube(url).then(data=>{
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
                    <Card title={"Ссылки"} style={{width:700}}>
                        <Space direction={"vertical"} style={{display:'flex', alignItems: 'flex-start'}}>
                            <Row style={{display:'flex', alignItems: 'flex-start'}}>
                                <h3>
                                    {'Youtube:'} {dataProfile.urlOnYoutube!=="" && <Link href={dataProfile.urlOnYoutube} target="_blank">{dataProfile.urlOnYoutube}</Link>}
                                    <Button className={classes.buttonEdit} onClick={()=>setCurrentEditingUrl('Youtube')}>{dataProfile.urlOnTelegram!=="" ? 'Изменить' : 'Добавить'}</Button>
                                </h3>
                            </Row>
                            <Row style={{display:'flex', alignItems: 'flex-start'}}>
                                <h3>
                                    {'Вконтакте:'} {dataProfile.urlOnVk!=="" && <Link href={dataProfile.urlOnVk} target="_blank">{dataProfile.urlOnVk}</Link>}
                                    <Button className={classes.buttonEdit} onClick={()=>setCurrentEditingUrl('ВКонтакте')}>{dataProfile.urlOnTelegram!=="" ? 'Изменить' : 'Добавить'}</Button>
                                </h3>
                            </Row>
                            <Row style={{display:'flex', alignItems: 'flex-start'}}>
                                <h3>
                                    {'Telegram:'} {dataProfile.urlOnTelegram!=="" && <Link href={dataProfile.urlOnTelegram} target="_blank">{dataProfile.urlOnTelegram}</Link>}
                                    <Button className={classes.buttonEdit} onClick={()=>setCurrentEditingUrl('Telegram')}>{dataProfile.urlOnTelegram!=="" ? 'Изменить' : 'Добавить'}</Button>
                                </h3>
                            </Row>
                        </Space>
                    </Card>
                    <Card title={"Главный lineup"} style={{width:459}}>
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
                                <VideoPreview type={"uservideo"} video={dataProfile.mainLineup}/>
                                <Button style={{marginTop: 10, width: "100%"}} onClick={handleSubmitMainLineup}>Принять</Button>
                                <Modal title={""} open={currentEditingUrl} onOk={handleSubmitChangeUrl} onCancel={()=>setCurrentEditingUrl()}>
                                    <Space style={{marginTop: 30, width: "100%"}} direction={"vertical"}>
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