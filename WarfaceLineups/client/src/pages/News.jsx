import React, {useState} from 'react';
import {Button, Card, Select, Space} from "antd";

const News = () => {
    const [filter, setFilter] = useState({
        newData: true
    });
    const handlerChangeFilterData = (value) =>{
        setFilter(prevState => ({
            ...prevState,
            newData: value
        }));
    }
    const dropFilter = () =>{
        setFilter(prevState => ({
            ...prevState,
            newData: true,
        }));
    }
    return (
        <Space direction={"horizontal"} align={"start"} style={{ display: 'flex', margin: 12}}>
            <Card title="Фильтр">
                <Space direction="vertical" style={{width:270}}>
                    <Select
                        value={filter.newData}
                        style={{width: '100%'}}
                        placeholder="Отсортировать по дате"
                        size={"large"}
                        className={"filterMap"}
                        onChange={handlerChangeFilterData}
                        options={[
                            { value: true, label: 'Сначала новые' },
                            { value: false, label: 'Сначала старые' },
                        ]}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                    <Button style={{width: '100%'}} onClick={dropFilter}>Сбросить фильтр</Button>
                </Space>
            </Card>
        </Space>
    );
};

export default News;