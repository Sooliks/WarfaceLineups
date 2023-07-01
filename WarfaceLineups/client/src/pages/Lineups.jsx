import React, {useEffect, useState} from 'react';
import {App, Button, Card, Pagination, Select, Space} from "antd";
import Search from "antd/es/input/Search";
import VideoPreview from "../components/VideoPreview";
import classes from './styles/Lineups.module.css'
import VideosAPI from "../http/api/VideosAPI";



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
    const handlerChangeFilterMap = (value) =>{
        setFilter(prevState => ({
            ...prevState,
            typeGameMap: value
        }));
    }
    const handlerChangeFilterFeature = (value) => {
        setFilter(prevState => ({
            ...prevState,
            typeFeature: value
        }));
    }
    const handlerChangeFilterSide = (value) => {
        setFilter(prevState => ({
            ...prevState,
            typeSide: value
        }));
    }
    const handlerChangeFilterSearch = (value) =>{
        setFilter(prevState => ({
            ...prevState,
            search: value
        }));
    }
    const dropFilter = () =>{
        setFilter(prevState => ({
            ...prevState,
            typeSide: 10,
            typeGameMap: 10,
            typeFeature: 10,
        }));
    }
    useEffect(()=>{
        VideosAPI.getVideos(currentPage, filter).then(data=>{
            setVideos(data);
        })
    },[currentPage,filter])
    return (
        <App>
            <Space direction="horizontal" size="large" align={"start"} style={{ display: 'flex'}}>
                <Space direction="vertical" size="large" align={"start"} style={{ display: 'flex', margin: 12 }}>
                    <Card title="Фильтр">
                        <Space direction="vertical" style={{width:270}}>
                            <Select
                                value={filter.typeGameMap}
                                style={{width: '100%'}}
                                placeholder="Выберите карту"
                                size={"large"}
                                className={"filterMap"}
                                onChange={handlerChangeFilterMap}
                                options={[
                                    { value: 10, label: 'Все' },
                                    { value: 2, label: 'Мосты' },
                                    { value: 5, label: 'Пирамида' },
                                    { value: 0, label: 'Переулки' },
                                    { value: 1, label: 'Антенны' },
                                    { value: 3, label: 'Фабрика' },
                                    { value: 4, label: 'Пункт Назначения' },
                                    { value: 6, label: 'Окраина' },
                                ]}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                showSearch
                            />
                            <Select
                                value={filter.typeFeature}
                                style={{width: '100%'}}
                                placeholder="Выберите тип фишки"
                                fullWidth
                                size={"large"}
                                className={"filterFeature"}
                                onChange={handlerChangeFilterFeature}
                                options={[
                                    { value: 10, label: 'Все' },
                                    { value: 1, label: 'Дымовая граната' },
                                    { value: 3, label: 'Осколочная граната' },
                                    { value: 2, label: 'Коктель молотова' },
                                    { value: 0, label: 'Светошумовая граната' },
                                ]}
                            />
                            <Select
                                value={filter.typeSide}
                                style={{width: '100%'}}
                                placeholder="Выберите тип стороны"
                                fullWidth
                                size={"large"}
                                className={"filterSide"}
                                onChange={handlerChangeFilterSide}
                                options={[
                                    { value: 10, label: 'Все' },
                                    { value: 0, label: 'Атака' },
                                    { value: 1, label: 'Защита' },
                                ]}
                            />
                            <Button style={{width: '100%'}} onClick={dropFilter}>Сбросить фильтр</Button>
                        </Space>
                    </Card>
                    <Card title="Найти">
                        <Space direction="vertical" style={{width:270}}>
                            <Search placeholder="Поиск по названию" allowClear onSearch={handlerChangeFilterSearch} style={{ width: '100%' }} />
                        </Space>
                    </Card>
                </Space>
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
                {videos.length!==0 && totalCountVideos > 8 && <Pagination pageSize={8} defaultCurrent={1} total={totalCountVideos} showSizeChanger={false} onChange={v=>setCurrentPage(v)} />}
            </Space>
        </App>
    );
};

export default Lineups;