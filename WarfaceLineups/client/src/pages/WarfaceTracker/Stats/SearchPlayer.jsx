import React from 'react';
import {Button, Card, Input, Space} from "antd";

const SearchPlayer = () => {
    return (
        <div>
            <Card>
                <Space direction={'vertical'}>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input placeholder="Введите никнейм игрока" />
                        <Button type="primary">Найти</Button>
                    </Space.Compact>
                    <Space>

                    </Space>
                </Space>
            </Card>
        </div>
    );
};

export default SearchPlayer;