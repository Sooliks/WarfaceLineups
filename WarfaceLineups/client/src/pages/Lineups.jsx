import React, {useEffect, useState} from 'react';
import {App, Pagination, Space, Spin} from "antd";
import VideoPreview from "../components/VideoPreview";
import classes from './styles/Lineups.module.css'
import VideosAPI from "../http/api/VideosAPI";
import Filter from "../components/Filter";
import {useNavigate} from "react-router-dom";



const Lineups = () => {
    const [totalCountVideos,setTotalCountVideos] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [videos,setVideos] = useState([]);
    const[filter,setFilter] = useState({
        typeSide:10,
        typeGameMap:10,
        typeFeature:10,
        search: "",
        typePlant: 10
    })
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        VideosAPI.getVideos(currentPage, filter).then(data=>{
            setVideos(data);
            VideosAPI.getCountVideos(filter).then(data=>setTotalCountVideos(data));
            setLoading(false);
        }).catch(e=>{})
    },[currentPage,filter])
    const handlerChangeFilter = (newFilter) => {
        setCurrentPage(1);
        setFilter(newFilter);
    }
    return (
        <App>
            <Space direction="horizontal" size="large" align={"start"} style={{ display: 'flex'}}>
                <Space style={{marginTop:12, marginLeft: 12}}>
                    <Filter onChangeFilter={handlerChangeFilter} direction={"vertical"} widthFilter={200}/>
                </Space>
                {loading ? <Spin size="large" style={{marginTop:30}}/> :
                    <Space direction="horizontal" style={{display: 'flex', marginTop: 12}} size={[2, 4]} wrap>
                        {videos.length !== 0 ? videos.map(videos =>
                                <VideoPreview video={videos} key={videos.id} type={"default"} changeUrl={true}/>
                            )
                            :
                            <div>
                                <h1>Здесь пока ничего нету</h1>
                                <h3>Загрузите лайнап первым!</h3>
                            </div>
                        }
                    </Space>
                }
            </Space>
            {!loading &&
                <Space className={classes.pagination}>
                    {videos.length !== 0 && totalCountVideos > 8 &&
                        <Pagination current={currentPage} pageSize={8} onChange={page => setCurrentPage(page)}
                                    defaultCurrent={1} total={totalCountVideos} showSizeChanger={false}/>}
                </Space>
            }
        </App>
    );
};

export default Lineups;