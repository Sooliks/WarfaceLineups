import React, {useEffect, useState} from 'react';
import {Pagination, Space} from "antd";
import VideoPreview from "../../components/VideoPreview";
import classes from "../styles/Profile.module.css";
import Filter from "../../components/Filter";

import CookieFavorites from "../../data/cookies/CookieFavorites";

const Favorites = () => {
    const [totalCountVideos,setTotalCountVideos] = useState(8);
    const [videos,setVideos] = useState([
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
    ]);
    const[filter,setFilter] = useState({
        typeSide:10,
        typeGameMap:10,
        typeFeature:10,
        search: "",
    })
    useEffect(()=>{
        if(CookieFavorites.videos.length!==0){
            CookieFavorites.GetFavoritesVideos().then(data=>setVideos(data))
        }
    },[])
    return (
        <div>
            <Filter onChangeFilter={(filter)=>setFilter(filter)}/>
            <Space direction="horizontal" style={{ display: 'flex',  margin: 12 }} size={[2, 4]} wrap>
                {videos.length!==0 ? videos.map(video=>
                    <VideoPreview video={video} type={"favorites"}/>
                ): <p>Здесь пока ничего нету</p>}
            </Space>
            <Space className={classes.pagination}>
                {videos.length!==0 && totalCountVideos > 8 && <Pagination pageSize={8} defaultCurrent={1} total={totalCountVideos} showSizeChanger={false} />}
            </Space>
        </div>
    );
};

export default Favorites;