import React, {useContext, useState} from 'react';
import {Button, Card, Progress, Space, Table, Tooltip} from "antd";
import AimTrackingAPI from "../http/api/AimTrackingAPI";
import {Context} from "../index";


let interval;

const AimTracking = () => {
    const [data,setData] = useState( []);
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
        },
    ];
    const [isVisibleAimTargets,setIsVisibleAimTargets] = useState(false);
    const [time,setTime] = useState(0);
    const [targets,setTargets] = useState([]);
    const [score,setScore] = useState(0)
    const handleClickStart = () => {
        setTargets([])
        setTime(0)
        clearInterval(interval);
        setScore(0)
        setIsVisibleAimTargets(true);
        interval = setInterval(()=>{
            setTime(prev=>prev+1)
        },1000)

        for (let i = 0; i < 10; i++){
            const newTargets = targets;
            newTargets.push({
                left: Math.floor(Math.random() * 630) + 1,
                top: Math.floor(Math.random() * 540) + 1
            })
            setTargets(newTargets)
        }

        setTimeout(()=>{
            clearInterval(interval);
            setIsVisibleAimTargets(false)
            setTargets([])
            AimTrackingAPI.uploadScore(score).then(data=>{

            })
        },100000)
    }

    const handleClickOnTarget = (target) => {
        setTargets(newTargets=>newTargets.filter(t=>t!==target))
        setScore(prev=>prev+1)
        setTargets((prev)=>[...prev,{
            left: Math.floor(Math.random() * 630) + 1,
            top: Math.floor(Math.random() * 540) + 1
        }])
    }
    const {user} = useContext(Context);



    return (
        <Space style={{margin:12, alignItems: 'flex-start'}}>
            <Space style={{alignItems: 'flex-start', width: 1000, justifyContent:'space-between'}}>
                <Card style={{width:290}}>
                    <Table dataSource={data} columns={columnsStats} onChange={(pagination)=>console.log(pagination)}/>
                </Card>
                <Space>
                    <Card>
                        <Space direction={"vertical"} style={{width:700, height:700}}>
                            <Card>
                                <Space direction={"horizontal"} style={{width:'100%',justifyContent:'space-between'}}>
                                    <div>
                                        <h3>Ваш счет: {score}</h3>
                                    </div>
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
                                    {user.isAuth ?
                                        <Button size={"large"} onClick={handleClickStart}>Начать</Button>
                                        :
                                        <Tooltip placement="top" title={"Для того чтобы сыграть нужно авторизоваться"}>
                                            <Button size={"large"} disabled>Начать</Button>
                                        </Tooltip>
                                    }
                                </Card>
                                :
                                <Card style={{width: '100%', height: 600}}>
                                    {targets.map((target,index)=>
                                        <div
                                            key={index}
                                            style={{
                                                border: '0 solid transparent',
                                                borderRadius: '50%',
                                                width:30,
                                                height:30,
                                                backgroundColor: '#1668dc',
                                                marginTop: target.top,
                                                marginLeft: target.left,
                                                position: 'absolute'
                                            }}
                                            onClick={()=>handleClickOnTarget(target)}
                                        />
                                    )}
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