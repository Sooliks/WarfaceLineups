import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Progress, Space, Table, Tooltip} from "antd";
import AimTrackingAPI from "../http/api/AimTrackingAPI";
import {Context} from "../index";
import useSound from 'use-sound'
import clickSound from '../assets/sounds/click.mp3'
import missSound from '../assets/sounds/miss.mp3'
import ModalOtherProfile from "../components/ModalOtherProfile";
let interval;

const AimTracking = () => {
    const [idProfile,setIdProfile] = useState();

    const [data,setData] = useState( []);
    const [playSoundClick] = useSound(clickSound,{volume: 0.3})
    const [playSoundMiss] = useSound(missSound,{volume: 0.3})


    const columnsStats = [
        {
            title: 'Логин',
            dataIndex: 'login',
            key: 'login',
            render: (text) => <Button type="link" onClick={()=>{
                setIsVisibleProfile(true)
                let profile = data.find(d => d.login === text);
                setIdProfile(profile.id)
            }}>{text}</Button>,
        },
        {
            title: 'Очки',
            dataIndex: 'aimTrackingScore',
            key: 'aimTrackingScore',
        },
    ];
    const [isVisibleProfile,setIsVisibleProfile] = useState(false)


    const [isVisibleAimTargets,setIsVisibleAimTargets] = useState(false);
    const [time,setTime] = useState(0);
    const [targets,setTargets] = useState([]);
    const [score,setScore] = useState(0)
    const [isFinish,setIsFinish] = useState(false);

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
            addNewTarget();
        }

        setTimeout(()=>{
            clearInterval(interval);
            setIsVisibleAimTargets(false)
            setTargets([])
            setTime(100);
            setIsFinish(true)
        },100000)
    }

    if(isFinish){
        AimTrackingAPI.uploadScore(score).then(data=>{
            AimTrackingAPI.getRating().then(data=>setData(data)).catch(e=>window.location.reload());
        }).catch(()=>{

        })
        setIsFinish(false);
    }
    const addNewTarget = () => {
        const checkApprox = (num1, num2, epsilon) => {
            return Math.abs(num1 - num2) < epsilon;
        }
        let left = Math.floor(Math.random() * 630) + 1
        let top = Math.floor(Math.random() * 540) + 1

        for (let i = 0; i < targets.length; i++){
            if(checkApprox(left, targets[i].left,60) && checkApprox(top, targets[i].top,60)){
                addNewTarget()
                return
            }
        }
        setTargets((prev)=>[...prev,{
            left: left,
            top: top
        }])
    }

    const handleClickOnTarget = (target) => {
        playSoundClick();
        setTargets(newTargets=>newTargets.filter(t=>t!==target))
        setScore(prev=>prev+1)
        addNewTarget();
    }
    const {user} = useContext(Context);

    useEffect(()=>{
        AimTrackingAPI.getRating().then(data=>setData(data)).catch(e=>window.location.reload());
    },[])

    return (
        <Space style={{margin:12, alignItems: 'flex-start'}}>
            <Space style={{alignItems: 'flex-start', width: 1000, justifyContent:'space-between'}}>
                <Card style={{width:290}}>
                    <Table dataSource={data} columns={columnsStats} pagination={false}/>
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
                                <Card style={{width: '100%', height: 600}} onMouseDown={(e)=>e.preventDefault()}>
                                    {targets.map((target,index)=>
                                        <div
                                            onMouseDown={(e)=>{e.preventDefault(); handleClickOnTarget(target)}}
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
                                        />
                                    )}
                                </Card>
                            }
                        </Space>
                    </Card>
                </Space>
            </Space>
            {isVisibleProfile &&
                <ModalOtherProfile ownerId={idProfile} onClose={()=>setIsVisibleProfile(false)}/>
            }
        </Space>
    );
};

export default AimTracking;