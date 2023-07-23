import React, {useContext, useState} from 'react';
import {Avatar, Button, Card, Divider, Form, Input, List, Skeleton, Space, Typography} from "antd";
import {Context} from "../../index";
import CommentsAPI from "../../http/api/CommentsAPI";
import ModalOtherProfile from "../ModalOtherProfile";
import InfiniteScroll from 'react-infinite-scroll-component';

const { Link } = Typography;




const Comments = ({comments = new Array(), lineup}) => {
    const[isVisibleEditing,setIsVisibleEditing] = useState(false);
    const [isVisibleProfile,setIsVisibleProfile] = useState(false);
    const [loading, setLoading] = useState(false);

    const {user} = useContext(Context);

    const handleClickDeleteCommentAdmin = (id) => {
        CommentsAPI.deleteCommentAdmin(id).then(data=>{

        })
    }
    const handleClickDeleteCommentOwnerLineup = (id) =>{
        CommentsAPI.deleteCommentOwnerLineup(id).then(data=>{

        })
    }
    const handleClickDeleteCommentOwnerComment = (id) =>{
        CommentsAPI.deleteCommentUser(id).then(data=>{

        })
    }
    const handleClickSubmitComment = (values) =>{
        CommentsAPI.addComment(lineup.id,values.text).then(data=>{

        })
    }
    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
    };

    return (
        <Card style={{width:'100%', height:400}} title={"Комментарии"}>
            <Space direction={"vertical"} style={{height:'100%',justifyContent:"space-between", width:'100%', alignItems:'flex-start'}}>
                <Space style={{width:'100%'}}>
                    {comments.length > 0 ?
                        <div
                            id="scrollableDiv"
                            style={{
                                height: 260,
                                width:590,
                                overflow: 'auto',
                                padding: '0 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                            }}
                        >
                            <InfiniteScroll
                                dataLength={comments.length}
                                next={loadMoreData}
                                hasMore={comments.length < 50}
                                loader={
                                    <Skeleton
                                        avatar
                                        paragraph={{
                                            rows: 1,
                                        }}
                                        active
                                    />
                                }
                                endMessage={<Divider plain>Больше нету 🤐</Divider>}
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    itemLayout="vertical"
                                    dataSource={comments}
                                    renderItem={(comment) => (
                                        <List.Item style={{width:'100%'}} actions={[
                                            user.user.id === comment.ownerId && <Link onClick={()=>setIsVisibleEditing(true)}>Редактировать</Link>,
                                            user.user.role === 'admin' && <Link onClick={()=>handleClickDeleteCommentAdmin(comment.id)}>Удалить как админ</Link>,
                                            user.user.id === comment.ownerIdLineup ?
                                                <Link onClick={()=>handleClickDeleteCommentOwnerLineup(comment.id)}>Удалить</Link>
                                                :
                                                user.user.id === comment.ownerId && <Link onClick={()=>handleClickDeleteCommentOwnerComment(comment.id)}>Удалить</Link>,
                                        ]}>
                                            <List.Item.Meta
                                                avatar={<Avatar src={`/api/avatar/${comment.ownerId}`}/>}
                                                title={<Link onClick={()=>setIsVisibleProfile(true)}>{comment.ownerLogin}</Link>}
                                                description={comment.text}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </InfiniteScroll>
                        </div>
                        :
                        <h3>Оставьте комментарий первым</h3>
                    }
                </Space>
                {user.isAuth ?
                    <Space style={{width:'100%'}}>
                        <Form
                            layout={"inline"}
                            name="basic"
                            onFinish={handleClickSubmitComment}
                            autoComplete="off"
                        >
                            <Form.Item
                                label=""
                                name="text"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста введите комментарий',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Отправить</Button>
                            </Form.Item>
                        </Form>
                    </Space>
                    :
                    <h4>Оставлять комментарии могут только авторизованные пользователи</h4>
                }
                {isVisibleProfile &&
                    <ModalOtherProfile ownerId={lineup.ownerId} onClose={()=>setIsVisibleProfile(false)}/>
                }
            </Space>
        </Card>
    );
};

export default Comments;