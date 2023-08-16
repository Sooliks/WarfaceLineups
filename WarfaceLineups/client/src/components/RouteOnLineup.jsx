import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import VideosAPI from "../http/api/VideosAPI";
import ModalVideo from "./ModalVideo";
import ModalScreenshots from "./ModalScreenshots";
import {Space} from "antd";

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
            setTypeLineup('notfound')
            window.location.reload()
        })
    },[])
    return (
        <div>
            {typeLineup === 'video' && <ModalVideo video={lineup} onClose={()=>setTypeLineup('')}/>}
            {typeLineup === 'screenshots' && <ModalScreenshots video={lineup} onClose={()=>setTypeLineup('')}/>}
            {typeLineup === 'notfound' &&
                <Space align={"center"}>
                    <h3>Лайнап не найден</h3>
                </Space>
            }
        </div>
    );
};

export default RouteOnLineup;