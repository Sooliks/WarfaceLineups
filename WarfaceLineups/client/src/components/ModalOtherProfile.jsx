import React, {useEffect, useState} from 'react';
import {Card, Modal, Space} from "antd";
import Filter from "./Filter";
import UserAPI from "../http/api/UserAPI";
import VideoPreview from "./VideoPreview";
import SettingsAPI from "../http/api/SettingsAPI";


const ModalOtherProfile = ({ownerId,loginAccount,onClose}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataProfile,setDataProfile] = useState({
        lineups: [],
        mainLineup: {},
        urlOnYoutube: "",
        urlOnVk: "",
        urlOnTelegram: "",
    });
    const[filter,setFilter] = useState({
        typeSide:10,
        typeGameMap:10,
        typeFeature:10,
        search: "",
        typePlant: 10
    })
    useEffect(()=>{
        UserAPI.getDataProfile(ownerId,filter,currentPage).then(data=>{
            setDataProfile({...dataProfile,
                lineups: [...dataProfile.lineups,...data.lineups],
                mainLineup: data.mainLineup,
                urlOnYoutube: data.urlOnYoutube,
                urlOnVk: data.urlOnVk,
                urlOnTelegram: data.urlOnTelegram,
            })
        })
    },[currentPage])
    useEffect(()=>{
        UserAPI.getDataProfile(ownerId,filter,1).then(data=>{
            setDataProfile(data);
        })
    },[filter])

    const handlerChangeFilter = (newFilter) =>{
        setDataProfile({...dataProfile, })
        setFilter(newFilter);
    }

    return (
        <div>
            <Modal
                title={"    Профиль пользователя: "+loginAccount}
                centered
                open
                onCancel={onClose}
                width={1840}
                footer={[

                ]}
            >
                <Space direction={"horizontal"} style={{display:'flex', alignItems: 'flex-start'}}>
                    <Space direction={"vertical"} style={{display:'flex', alignItems: 'flex-start', justifyContent:'flex-start', margin:12}}>
                        <Card title={"Ссылки"} style={{width:392}}>

                        </Card>
                        {dataProfile.mainLineup !== null &&
                            <VideoPreview video={dataProfile.mainLineup} type={"uservideo"}/>
                        }
                    </Space>
                    <Card style={{marginTop:12, height: 850, width:1350}}>
                        <Space style={{display:'flex', alignItems: 'flex-start', justifyContent:'flex-start'}} direction={"vertical"}>
                            <Filter isVisibleSearch={false} onChangeFilter={handlerChangeFilter} direction={"horizontal"} widthFilter={50} dropFilterButtonIcon/>
                            <Space size={[2, 3]} wrap style={{height:670,overflowY:'auto',width:'1320px', alignItems:'flex-start'}}>
                                {dataProfile.lineups.map(lineup=>
                                    <VideoPreview type={"uservideo"}  video={lineup}/>
                                )}
                            </Space>
                        </Space>
                    </Card>
                </Space>
            </Modal>
        </div>
    );
};

export default ModalOtherProfile;