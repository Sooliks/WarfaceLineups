import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Divider, Space, Typography} from "antd";
import ReportsAPI from "../../../http/api/ReportsAPI";
import ModalOtherProfile from "../../../components/ModalOtherProfile";
import VideosAPI from "../../../http/api/VideosAPI";
import ModalVideo from "../../../components/ModalVideo";
import ModalScreenshots from "../../../components/ModalScreenshots";

const { Text, Link } = Typography;

const Reports = () => {
    const [isVisibleProfile,setIsVisibleProfile] = useState(false)

    const [isVisibleModalVideo,setIsVisibleModalVideo] = useState(false)
    const [isVisibleModalScreenshots,setIsVisibleModalScreenshots] = useState(false)

    const [lineup,setLineup] = useState({})
    const [reports,setReports] = useState([]);
    useEffect(()=>{
        ReportsAPI.getReports().then(data=>setReports(data))
    },[])
    const handleClickCheckLineup = (lineupId) => {
        VideosAPI.getLineupById(lineupId).then(data=>{
            setLineup(data)
            if(data.screenShotsId===0){
                setIsVisibleModalVideo(true);
            }
            else {
                setIsVisibleModalScreenshots(true);
            }
        });
    }


    return (
        <Card title={"Reports"} style={{width:900, height:700}}>
            <Space direction={"vertical"} style={{overflowY:'auto'}}>
                {reports.length!==0 ? reports.map(report=>
                    <Card key={report.id}>
                        <Space split={<Divider type="vertical" />}>
                            <Space>
                                <p>Отправил: </p>
                                <Space>
                                    <Avatar src={`/api/avatar/${report.senderId}`} alt={report.senderId}/>
                                    <Link onClick={()=>setIsVisibleProfile(true)}>{report.senderLogin}</Link>
                                </Space>
                            </Space>
                            <Space>
                                {report.typeReport === 'tags' && <p>Неверные теги</p>}
                                {report.typeReport === 'dontWork' && <p>Lineup не работает</p>}
                                {report.typeReport === 'other' && <p>Другая причина</p>}
                            </Space>
                            <Space>
                                <Link onClick={()=>handleClickCheckLineup(report.lineupId)}>Lineup</Link>
                            </Space>
                        </Space>
                        {isVisibleModalVideo && <ModalVideo video={lineup} onClose={()=>setIsVisibleModalVideo(false)}/>}
                        {isVisibleModalScreenshots && <ModalScreenshots video={lineup} onClose={()=>setIsVisibleModalScreenshots(false)}/>}

                        {isVisibleProfile &&
                            <ModalOtherProfile ownerId={report.senderId} onClose={()=>setIsVisibleProfile(false)}/>
                        }
                    </Card>
                )
                    : <h3>Репортов пока нету</h3>
                }
            </Space>
        </Card>
    );
};

export default Reports;