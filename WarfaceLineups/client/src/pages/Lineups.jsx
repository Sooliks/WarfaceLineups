import React, {useEffect, useState} from 'react';
import {App, Button, Card, Pagination, Select, Space} from "antd";
import Search from "antd/es/input/Search";
import VideoPreview from "../components/VideoPreview";
import classes from './styles/Lineups.module.css'
import VideosAPI from "../http/api/VideosAPI";
import Filter from "../components/Filter";



const Lineups = () => {

    const [totalCountVideos,setTotalCountVideos] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
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
        VideosAPI.getVideos(currentPage, filter).then(data=>{
            setVideos(data);
            VideosAPI.getCountVideos(filter).then(data=>setTotalCountVideos(data));
        })
    },[currentPage,filter])
    const handlerChangeFilter = (newFilter) =>{
        setFilter(newFilter);
    }
    return (
        <App>
            <Space direction="horizontal" size="large" align={"start"} style={{ display: 'flex'}}>
                <Filter onChangeFilter={handlerChangeFilter} direction={"vertical"} widthFilter={{width:270}}/>
                <Space direction="horizontal" style={{ display: 'flex',  margin: 12 }} size={[2, 4]} wrap>
                    {videos.length!==0 ? videos.map(videos=>
                        <VideoPreview video={videos} type={"default"}/>
                    )
                        :
                        <div>
                            <h1>Здесь пока ничего нету</h1>
                            <h3>Загрузите лайнап первым!</h3>
                        </div>
                    }
                </Space>
            </Space>
            <Space className={classes.pagination}>
                {videos.length!==0 && totalCountVideos > 8 && <Pagination pageSize={8} onChange={page=>setCurrentPage(page)} defaultCurrent={1} total={totalCountVideos} showSizeChanger={false}/>}
            </Space>
        </App>
    );
};

export default Lineups;