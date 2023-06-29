import React, {useState} from 'react';
import {App, Button, Card, Select, Space} from "antd";
import Search from "antd/es/input/Search";
import VideoPreview from "../components/VideoPreview";

const Lineups = () => {
    const [videos,setVideos] = useState([
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
        {id: 0, title: "Смок на 9", description: "тут можете вот так кидать", ownerId: 0, urlOnVideo: "https://www.youtube.com/watch?v=J50XFBrO7ok", typeGameMap: 0, typeSide: 0, urlOnPreview: "https://i.ytimg.com/vi/J50XFBrO7ok/maxresdefault.jpg"},
    ]);
    const handleChangeFilter = (e) =>{
        switch (e.target.name){
            case 'filterMap':
                break
            case 'filterFeature':
                break
            case 'filterSide':
                break
        }
    }
    const handlerOnSearchOnName = (value) =>{

    }
    return (
        <App>
            <Space direction="horizontal" size="large" align={"start"} style={{ display: 'flex'}}>
                <Space direction="vertical" size="large" align={"start"} style={{ display: 'flex', margin: 12 }}>
                    <Card title="Фильтр">
                        <Space direction="vertical" style={{width:270}}>
                            <Select
                                style={{width: '100%'}}
                                placeholder="Выберите карту"
                                size={"large"}
                                name={"filterMap"}
                                onChange={e=>handleChangeFilter(e)}
                                options={[
                                    { value: 'все', label: 'Все' },
                                    { value: 'мосты', label: 'Мосты' },
                                    { value: 'пирамида', label: 'Пирамида' },
                                    { value: 'переулки', label: 'Переулки' },
                                    { value: 'антенны', label: 'Антенны' },
                                    { value: 'фабрика', label: 'Фабрика' },
                                    { value: 'пунктназначения', label: 'Пункт Назначения' },
                                    { value: 'окраина', label: 'Окраина' },
                                ]}
                            />
                            <Select
                                style={{width: '100%'}}
                                placeholder="Выберите тип фишки"
                                fullWidth
                                size={"large"}
                                name={"filterFeature"}
                                onChange={e=>handleChangeFilter(e)}
                                options={[
                                    { value: 'все', label: 'Все' },
                                    { value: 'дымоваяграната', label: 'Дымовая граната' },
                                    { value: 'осколочнаяграната', label: 'Осколочная граната' },
                                    { value: 'коктельмолотова', label: 'Коктель молотова' },
                                    { value: 'светошумоваяграната', label: 'Светошумовая граната' },
                                ]}
                            />
                            <Select
                                style={{width: '100%'}}
                                placeholder="Выберите тип стороны"
                                fullWidth
                                size={"large"}
                                name={"filterSide"}
                                onChange={e=>handleChangeFilter(e)}
                                options={[
                                    { value: 'все', label: 'Все' },
                                    { value: 'атака', label: 'Атака' },
                                    { value: 'защита', label: 'Защита' },
                                ]}
                            />
                            <Button style={{width: '100%'}}>Сбросить фильтр</Button>
                        </Space>
                    </Card>
                    <Card title="Найти">
                        <Space direction="vertical" style={{width:270}}>
                            <Search placeholder="Поиск по названию" allowClear onSearch={handlerOnSearchOnName} style={{ width: '100%' }} />
                        </Space>
                    </Card>
                </Space>
                <Space direction="horizontal" style={{ display: 'flex',  margin: 12 }} size={[3, 5]} wrap>
                    {videos!=null && videos.map(videos=>
                        <VideoPreview video={videos}/>
                    )}
                </Space>
            </Space>
        </App>
    );
};

export default Lineups;