import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import VideosAPI from "../http/api/VideosAPI";
import ModalVideo from "./ModalVideo";
import ModalScreenshots from "./ModalScreenshots";
import {notification, Space} from "antd";
import Lineups from "../pages/Lineups";

const RouteOnLineup = () => {
    const {id} = useParams();

    const [typeLineup,setTypeLineup] = useState('');
    const [lineup,setLineup] = useState({});
    useEffect(()=>{
        VideosAPI.getLineupById(id).then(data=>{
            if(data.screenShotsId===0){
                setLineup(data)
                setTypeLineup('video')
            }else {
                setLineup(data)
                setTypeLineup('screenshots')
            }
        }).catch(()=>{
            notification.error({
                message: "Уведомление",
                description: "Лайнап не найден"
            })
        })
    },[])
    return (
        <div>
            <Lineups/>
            {typeLineup === 'video' && <ModalVideo video={lineup} onClose={()=>setTypeLineup('')}/>}
            {typeLineup === 'screenshots' && <ModalScreenshots video={lineup} onClose={()=>setTypeLineup('')}/>}
        </div>
    );
};

export default RouteOnLineup;