import React, {useEffect, useState} from 'react';
import {Card, Image, Modal, Pagination, Space} from "antd";
import Filter from "./Filter";
import UserAPI from "../http/api/UserAPI";
import classes from "../pages/styles/Profile.module.css";
import VideoPreview from "./VideoPreview";

const ModalOtherProfile = ({ownerId,loginAccount,onClose}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCountVideos,setTotalCountVideos] = useState(8);
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
            setDataProfile(data);
        })
    },[currentPage,filter])

    const handlerChangeFilter = (newFilter) =>{
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
                        <Card title={"Ссылки"} style={{margin:12, width:463.4}}>

                        </Card>
                        <Card style={{margin:12}}>
                            <VideoPreview video={dataProfile.mainLineup} type={"uservideo"}/>
                        </Card>
                        <Filter isVisibleSearch={false} onChangeFilter={handlerChangeFilter} direction={"vertical"} widthFilter={415}/>
                    </Space>
                    <Card style={{marginTop:20, height: 800, width:1250}}>
                        <Space style={{display:'flex', alignItems: 'flex-start', justifyContent:'flex-start'}}>

                        </Space>
                        <Space className={classes.pagination}>
                            {dataProfile.lineups.length!==0 && totalCountVideos > 8 && <Pagination onChange={page=>setCurrentPage(page)} pageSize={8} defaultCurrent={1} total={totalCountVideos} showSizeChanger={false} />}
                        </Space>
                    </Card>
                </Space>
            </Modal>
        </div>
    );
};

export default ModalOtherProfile;