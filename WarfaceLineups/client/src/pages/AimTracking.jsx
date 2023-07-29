import React, {useState} from 'react';
import {Button, Card, Progress, Space, Table} from "antd";

let interval;

const AimTracking = () => {
    const [data,setData] = useState( [
        {login:'sooliks', rate: 100},
        {login:'sooliks', rate: 120},
    ]);
    const columnsStats = [
        {
            title: 'Логин',
            dataIndex: 'login',
            key: 'login',
            render: (text) => <Button type="link">{text}</Button>,
        },
        {
            title: 'Очки',
            dataIndex: 'rate',
            key: 'rate',
            /*sorter: {
                compare: (a, b) => a.rate - b.rate,
                multiple: 2,
            },*/
        },
    ];
    const [isVisibleAimTargets,setIsVisibleAimTargets] = useState(false);
    const [time,setTime] = useState(0);
    const handleClickStart = () => {
        setTime(0)
        clearInterval(interval);
        setIsVisibleAimTargets(true);
        interval = setInterval(()=>{
            setTime(prev=>prev+1)
            if(time===40){
                clearInterval(interval);
                setIsVisibleAimTargets(false)
                console.log('dggd')
            }
        },1000)
    }



    return (
        <Space style={{margin:12, alignItems: 'flex-start'}}>
            <Space style={{alignItems: 'flex-start', width: 1000, justifyContent:'space-between'}}>
                <Card style={{width:290}}>
                    <Table dataSource={data} columns={columnsStats}/>
                </Card>
                <Space>
                    <Card>
                        <Space direction={"vertical"} style={{width:700, height:700}}>
                            <Card>
                                <Space direction={"horizontal"} style={{width:'100%',justifyContent:'space-between'}}>
                                    <div></div>
                                    <Progress type="circle" percent={time} size={40}/>
                                </Space>
                            </Card>
                            {!isVisibleAimTargets ?
                                <Card style={{
                                    width: '100%',
                                    height: 600,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Button size={"large"} onClick={handleClickStart}>Начать</Button>
                                </Card>
                                :
                                <Card style={{width: '100%', height: 600}}>

                                </Card>
                            }
                        </Space>
                    </Card>
                </Space>
            </Space>
        </Space>
    );
};

export default AimTracking;