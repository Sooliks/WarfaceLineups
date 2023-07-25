import React, {useEffect, useState} from 'react';
import {Card, Divider, List, Modal, Skeleton, Space, Spin, Typography} from "antd";
import Filter from "./Filter";
import UserAPI from "../http/api/UserAPI";
import VideoPreview from "./VideoPreview";
import InfiniteScroll from "react-infinite-scroll-component";
import VideosAPI from "../http/api/VideosAPI";
import CommentItem from "./ui/CommentItem";
import {cookiesFromFavorites} from "../data/cookies";
const { Link } = Typography;

const ModalOtherProfile = ({ownerId,onClose}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const[loading,setLoading] = useState(false);
    const [dataProfile,setDataProfile] = useState({
        lineups: [],
        mainLineup: {},
        urlOnYoutube: "",
        urlOnVk: "",
        urlOnTelegram: "",
        totalCountLineups: 0,
        login: ""
    });
    const[filter,setFilter] = useState({
        typeSide:10,
        typeGameMap:10,
        typeFeature:10,
        search: "",
        typePlant: 10
    })
    useEffect(()=>{
        UserAPI.getDataProfile(ownerId,filter,1).then(data=>setDataProfile(data));
        setCurrentPage((prev)=>prev+1)
    },[])
    const loadMoreData = () => {
        if (loading) {
            console.log('vidno', currentPage)
            return;
        }
        setLoading(true);
        VideosAPI.getLineupsByOwnerId(filter,ownerId,currentPage).then(data=>{
            setDataProfile({...dataProfile, lineups: [...dataProfile.lineups,...data]})
            setCurrentPage((prev)=>prev+1)
            setLoading(false)
        }).catch(()=>{
            setLoading(false)
        })
    };


    const handlerChangeFilter = (filter) =>{
        setFilter(filter);
        setDataProfile({})
        setDataProfile({...dataProfile, lineups: dataProfile.lineups.filter(v => (v.typeSide === filter.typeSide || filter.typeSide === 10) && (v.typeFeature === filter.typeFeature || filter.typeFeature === 10) && (v.typeGameMap === filter.typeGameMap || filter.typeGameMap === 10) && (v.typePlant === filter.typePlant || filter.typePlant === 10) && (v.title.toLowerCase().startsWith(filter.search.toLowerCase()) || filter.search === ""))})

    }

    return (
        <div>
            <Modal
                title={"    Профиль пользователя: "+dataProfile.login}
                centered
                open
                onCancel={onClose}
                width={1840}
                footer={[

                ]}
            >
                <Space direction={"horizontal"} style={{display: 'flex', alignItems: 'flex-start'}}>
                    <Space direction={"vertical"} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        margin: 12
                    }}>
                        <Card title={"Ссылки"} style={{width: 392}}>
                            <Space direction={"vertical"} split={<Divider type="horizontal" />}>
                            {dataProfile.urlOnYoutube !== "" &&
                                <Space>
                                    <p>Youtube</p>
                                    <Link href={dataProfile.urlOnYoutube} target="_blank">{dataProfile.urlOnYoutube}</Link>
                                </Space>
                            }
                            {dataProfile.urlOnVk !== "" &&
                                <Space>
                                    <p>ВКонтакте</p>
                                    <Link href={dataProfile.urlOnVk} target="_blank">{dataProfile.urlOnVk}</Link>
                                </Space>
                            }
                            {dataProfile.urlOnTelegram !== "" &&
                                <Space>
                                    <p>Telegram</p>
                                    <Link href={dataProfile.urlOnTelegram} target="_blank">{dataProfile.urlOnTelegram}</Link>
                                </Space>
                            }
                            </Space>
                        </Card>
                        {dataProfile.mainLineup !== null &&
                            <VideoPreview video={dataProfile.mainLineup} type={"uservideo"}/>
                        }
                    </Space>
                    <Card style={{marginTop: 12, height: 850, width: 1350}}>
                        <Space style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'}}
                               direction={"vertical"}>
                            <Filter isVisibleSearch={false} onChangeFilter={handlerChangeFilter}
                                    direction={"horizontal"} widthFilter={50} dropFilterButtonIcon/>
                            {dataProfile.lineups.length > 0 ?
                                <div
                                    id="scrollableDiv"
                                    style={{
                                        height: 670,
                                        overflow: 'auto',
                                        padding: '0 16px',
                                        border: '1px solid rgba(140, 140, 140, 0.35)',
                                        width: 1210,
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <InfiniteScroll
                                        dataLength={dataProfile.lineups.length}
                                        next={loadMoreData}
                                        hasMore={dataProfile.lineups.length < dataProfile.totalCountLineups}
                                        loader={<Skeleton paragraph={{rows: 1}} active/>}
                                        endMessage={<Divider plain>Это все, ничего больше 🤐</Divider>}
                                        scrollableTarget="scrollableDiv"
                                        style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop:12}}
                                    >
                                        {dataProfile.lineups.map(lineup =>
                                            <VideoPreview type={"uservideo"} video={lineup}/>
                                        )}
                                    </InfiniteScroll>
                                </div>
                                :
                                <h3>В этом профиле пока нету лайнапов</h3>
                            }
                        </Space>
                    </Card>
                </Space>
            </Modal>
        </div>
    );
};

export default ModalOtherProfile;