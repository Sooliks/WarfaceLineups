import React, {useContext, useEffect, useState} from 'react';
import {Affix, Pagination, Space} from "antd";
import VideoPreview from "../../components/VideoPreview";
import classes from "../styles/Profile.module.css";
import Filter from "../../components/Filter";

import FavoritesData from "../../data/FavoritesData";
import {Context} from "../../index";
import {cookies} from "../../data/cookies";

const Favorites = () => {
    const [totalCountVideos,setTotalCountVideos] = useState(0);
    const [videos,setVideos] = useState([]);
    const[filter,setFilter] = useState({
        typeSide:10,
        typeGameMap:10,
        typeFeature:10,
        search: "",
    })
    useEffect(()=>{
        setVideos(cookies.get('favoritesVideos').filter(v=>(v.typeSide === filter.typeSide || filter.typeSide === 10) && (v.typeFeature === filter.typeFeature || filter.typeFeature === 10)&&(v.typeGameMap === filter.typeGameMap || filter.typeGameMap === 10) && (v.title.startsWith(filter.search) || filter.search === "")))
    },[filter])
    const handlerChangeFilter = (newFilter) =>{
        setFilter(newFilter);
    }
    return (
        <div>
            <Affix offsetTop={10}>
                <Filter onChangeFilter={handlerChangeFilter}/>
            </Affix>
            <Space style={{overflowY:'auto'}}>
                <Space direction="horizontal" style={{ display: 'flex',  margin: 12 }} size={[2, 4]} wrap>
                    {videos.length!==0 ? videos.map(video=>
                        <VideoPreview video={video} type={"favorites"}/>
                    ): <p>Здесь пока ничего нету</p>}
                </Space>
            </Space>
        </div>
    );
};

export default Favorites;