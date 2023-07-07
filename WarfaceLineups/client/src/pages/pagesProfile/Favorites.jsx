import React, {useEffect, useState} from 'react';
import {Affix,Space} from "antd";
import VideoPreview from "../../components/VideoPreview";
import Filter from "../../components/Filter";
import {cookies} from "../../data/cookies";

const Favorites = () => {
    const [videos,setVideos] = useState([]);
    const[filter,setFilter] = useState({
        typeSide:10,
        typeGameMap:10,
        typeFeature:10,
        search: "",
    })
    useEffect(()=>{
        setVideos(cookies.get('favoritesVideos')?.filter(v => (v.typeSide === filter.typeSide || filter.typeSide === 10) && (v.typeFeature === filter.typeFeature || filter.typeFeature === 10) && (v.typeGameMap === filter.typeGameMap || filter.typeGameMap === 10) && (v.title.toLowerCase().startsWith(filter.search.toLowerCase()) || filter.search === "")))
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
                    {videos?.length!==0 ? videos?.map(video=>
                        <VideoPreview video={video} key={video.id} type={"favorites"}/>
                    ): <h3>Вы не добавили не одно видео в избранное</h3>}
                </Space>
            </Space>
        </div>
    );
};

export default Favorites;