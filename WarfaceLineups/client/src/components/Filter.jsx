import React, {useState} from 'react';
import {Button, Card, Select, Space} from "antd";
import Search from "antd/es/input/Search";

const Filter = ({onChangeFilter, direction, widthFilter, isVisibleSearch=true}) => {
    const[filter,setFilter] = useState({
        typeSide:10,
        typeGameMap:10,
        typeFeature:10,
        search: "",
    })
    const handlerChangeFilterMap = (value) =>{
        const newFilter = {
            ...filter, typeGameMap: value
        }
        onChangeFilter(newFilter)
        setFilter(newFilter)
    }
    const handlerChangeFilterFeature = (value) => {
        const newFilter = {
            ...filter, typeFeature: value
        }
        onChangeFilter(newFilter)
        setFilter(newFilter)
    }
    const handlerChangeFilterSide = (value) => {
        const newFilter = {
            ...filter, typeSide: value
        }
        onChangeFilter(newFilter)
        setFilter(newFilter)
    }
    const handlerChangeFilterSearch = (value) =>{
        const newFilter = {
            ...filter, search: value
        }
        onChangeFilter(newFilter)
        setFilter(newFilter)
    }
    const dropFilter = () =>{
        const newFilter = {
            ...filter,
            search: "",
            typeSide: 10,
            typeGameMap: 10,
            typeFeature: 10,
        }
        onChangeFilter(newFilter)
        setFilter(newFilter)
    }
    return (
        <Space direction={direction} size="large" align={"start"} style={{ display: 'flex', margin: 12 }}>
            <Card title="Фильтр">
                <Space direction={direction} style={widthFilter}>
                    <Select
                        value={filter.typeGameMap}
                        style={{width: 270}}
                        placeholder="Выберите карту"
                        size={"large"}
                        className={"filterMap"}
                        onChange={handlerChangeFilterMap}
                        options={[
                            { value: 10, label: 'Все' },
                            { value: 0, label: 'Мосты' },
                            { value: 1, label: 'Пирамида' },
                            { value: 2, label: 'Переулки' },
                            { value: 3, label: 'Антенны' },
                            { value: 4, label: 'Фабрика' },
                            { value: 5, label: 'Пункт Назначения' },
                            { value: 6, label: 'Окраина' },
                        ]}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        showSearch
                    />
                    <Select
                        value={filter.typeFeature}
                        style={{width: 270}}
                        placeholder="Выберите тип фишки"
                        fullWidth
                        size={"large"}
                        className={"filterFeature"}
                        onChange={handlerChangeFilterFeature}
                        options={[
                            { value: 10, label: 'Все' },
                            { value: 1, label: 'Дымовая граната' },
                            { value: 2, label: 'Осколочная граната' },
                            { value: 3, label: 'Коктель молотова' },
                            { value: 4, label: 'Светошумовая граната' },
                        ]}
                    />
                    <Select
                        value={filter.typeSide}
                        style={{width: 270}}
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
            {isVisibleSearch &&
                <Card title="Найти">
                    <Space direction="vertical" style={{width: 270}}>
                        <Search placeholder="Поиск по названию" allowClear onSearch={handlerChangeFilterSearch}
                                style={{width: '100%'}}/>
                    </Space>
                </Card>
            }
        </Space>
    );
};

export default Filter;