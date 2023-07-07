import React, {useEffect, useState} from 'react';
import {Card, Select, Space} from "antd";
import NewsAPI from "../http/api/NewsAPI";

const News = () => {
    const [filter, setFilter] = useState(1);
    const handlerChangeFilterData = (value) =>{
        setFilter(value);
    }
    const[news,setNews] = useState([]);
    useEffect(()=>{
        NewsAPI.getNews(filter).then(data=>{
            setNews(data);
        })
    },[filter])
    return (
        <Space direction={"horizontal"} align={"start"} style={{ display: 'flex', margin: 12}}>
            <Card title="Фильтр">
                <Space direction="vertical" style={{width:270}}>
                    <Select
                        value={filter}
                        style={{width: '100%'}}
                        placeholder="Отсортировать по дате"
                        size={"large"}
                        className={"filterMap"}
                        onChange={handlerChangeFilterData}
                        defaultValue={1}
                        options={[
                            { value: 1, label: 'Сначала новые' },
                            { value: 0, label: 'Сначала старые' },
                        ]}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Space>
            </Card>
            <Space direction={"vertical"}>
                {news.length!==0 ? news.map(news=>
                    <Card key={news.id} title={news.title} style={{width:800, height: 'auto', minHeight: 140, wordWrap:'break-word'}}>{news.text}</Card>
                ): <h3>Пока нету новостей</h3>}
            </Space>
        </Space>
    );
};

export default News;