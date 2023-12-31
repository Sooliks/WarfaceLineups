import React, {useEffect, useState} from 'react';
import VideoPreview from "../../components/VideoPreview";
import {Pagination, Space, Spin} from "antd";
import classes from "../styles/Profile.module.css";
import VideosAPI from "../../http/api/VideosAPI";
import Filter from "../../components/Filter";

const Videos = () => {
    const[filter,setFilter] = useState({
        typeSide:10,
        typeGameMap:10,
        typeFeature:10,
        search: "",
        typePlant: 10
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCountVideos,setTotalCountVideos] = useState(8);
    const[loading,setLoading] = useState(true)
    const [videos,setVideos] = useState([]);
    useEffect(()=>{
        VideosAPI.getVideosById(currentPage,filter).then(data=>{
            setVideos(data);
            VideosAPI.getCountVideosByOwnerId(filter).then(data=>setTotalCountVideos(data));
            setLoading(false);
        }).catch(e=>window.location.reload())
    },[filter,currentPage])
    const handlerChangeFilter = (newFilter) =>{
        setFilter(newFilter);
        setCurrentPage(1);
    }
    return (
        <Space direction={"vertical"}>
            <Filter onChangeFilter={handlerChangeFilter} direction={"horizontal"} isVisibleSearch={false} widthFilter={270}/>
            {loading ? <Spin size="large" style={{marginTop: 30}}/> :
                <Space direction="horizontal" style={{display: 'flex', marginLeft: 0}} size={[2, 4]} wrap>
                    {videos.length !== 0 ? videos.map(videos =>
                        <VideoPreview video={videos} key={videos.id} type={"uservideo"}/>
                    ) : <h3>Вы еще не загрузили видео</h3>}
                </Space>
            }
            <Space className={classes.pagination}>
                {videos.length!==0 && totalCountVideos > 8 && <Pagination current={currentPage} onChange={page=>setCurrentPage(page)} pageSize={8} defaultCurrent={1} total={totalCountVideos} showSizeChanger={false} />}
            </Space>

        </Space>
    );
};

export default Videos;