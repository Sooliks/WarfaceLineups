import React, {useEffect, useRef, useState} from 'react';
import {Card, Modal, Space, Spin} from "antd";
import Filter from "./Filter";
import UserAPI from "../http/api/UserAPI";
import VideoPreview from "./VideoPreview";
import SettingsAPI from "../http/api/SettingsAPI";
import {entries} from "mobx";
import VideosAPI from "../http/api/VideosAPI";


const ModalOtherProfile = ({ownerId,loginAccount,onClose}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const[loading,setLoading] = useState(true);
    const lastElement = useRef();
    const observer = useRef();
    const [dataProfile,setDataProfile] = useState({
        lineups: [],
        mainLineup: {},
        urlOnYoutube: "",
        urlOnVk: "",
        urlOnTelegram: "",
        totalCountLineups: 0
    });
    const[filter,setFilter] = useState({
        typeSide:10,
        typeGameMap:10,
        typeFeature:10,
        search: "",
        typePlant: 10
    })
    useEffect(()=>{
        if(loading)return;
        if(observer.current) observer.current.disconnect();
        const callback = function(entries,observer){
            if(entries[0].isIntersecting && currentPage < (dataProfile.totalCountLineups/8)){
                setCurrentPage((prev)=>prev+1);
            }
        }
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
    },[loading])
    //TODO доделать
    useEffect(()=>{
        UserAPI.getDataProfile(ownerId,filter,currentPage).then(data=>{
            setDataProfile({...dataProfile,
                lineups: [...dataProfile.lineups,...data.lineups],
                mainLineup: data.mainLineup,
                urlOnYoutube: data.urlOnYoutube,
                urlOnVk: data.urlOnVk,
                urlOnTelegram: data.urlOnTelegram,
                totalCountLineups: data.totalCountLineups,
            })
            setLoading(false)
        })
    },[currentPage])
    useEffect(()=>{
        UserAPI.getDataProfile(ownerId,filter,1).then(data=>{
            setDataProfile(data);
            setLoading(false)
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
                {!loading ?
                    <Space direction={"horizontal"} style={{display: 'flex', alignItems: 'flex-start'}}>
                        <Space direction={"vertical"} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            margin: 12
                        }}>
                            <Card title={"Ссылки"} style={{width: 392}}>

                            </Card>
                            {dataProfile.mainLineup !== null &&
                                <VideoPreview video={dataProfile.mainLineup} type={"uservideo"}/>
                            }
                        </Space>
                        <Card style={{marginTop: 12, height: 850, width: 1350}}>
                            <Space style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'}}
                                   direction={"vertical"}>
                                <Filter isVisibleSearch={false} onChangeFilter={handlerChangeFilter}
                                        direction={"horizontal"} widthFilter={50} dropFilterButtonIcon/>
                                <Space size={[2, 3]} wrap style={{
                                    height: 670,
                                    overflowY: 'auto',
                                    width: '1320px',
                                    alignItems: 'flex-start'
                                }}>
                                    {dataProfile.lineups.map(lineup =>
                                        <VideoPreview type={"uservideo"} video={lineup}/>
                                    )}
                                    <div ref={lastElement}></div>
                                </Space>
                            </Space>
                        </Card>
                    </Space>
                    : <Spin size="large"/>
                }
            </Modal>
        </div>
    );
};

export default ModalOtherProfile;