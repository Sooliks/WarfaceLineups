import React, {useEffect} from 'react';
import StatsGameAPI from "../../../http/api/wftracker/StatsGameAPI";

const Top100Clans = () => {
    useEffect(()=>{
        StatsGameAPI.getTop100ClansRu().then(data=>{
            console.log(data);
        })
    },[])
    return (
        <div>
            
        </div>
    );
};

export default Top100Clans;