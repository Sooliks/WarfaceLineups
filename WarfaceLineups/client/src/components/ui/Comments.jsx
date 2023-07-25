import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Divider, Form, Input, List, Skeleton, Space} from "antd";
import {Context} from "../../index";
import CommentsAPI from "../../http/api/CommentsAPI";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentItem from "./CommentItem";






const Comments = ({lineup}) => {
    const[comments,setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);

    const {user} = useContext(Context);

    const handleClickDeleteCommentAdmin = (id) => {
        try {
            CommentsAPI.deleteCommentAdmin(id).then(data => {
                if (data.message === "success") {
                    setComments((comments) => comments.filter(c => c.id !== id));
                }
            })
        }catch (e){}
    }
    const handleClickDeleteCommentOwnerLineup = (id) =>{
        try {
            CommentsAPI.deleteCommentOwnerLineup(id).then(data => {
                if (data.message === "success") {
                    setComments((comments) => comments.filter(c => c.id !== id));
                }
            })
        }catch (e) {

        }
    }
    const handleClickDeleteCommentOwnerComment = (id) =>{
        try {
            CommentsAPI.deleteCommentUser(id).then(data => {
                if (data.message === "success") {
                    setComments((comments) => comments.filter(c => c.id !== id));
                }
            })
        }catch (e) {}
    }
    const handleClickSubmitComment = (values) =>{
        CommentsAPI.addComment(lineup.id,values.text).then(data=>{
            //TODO сделать динамичное добавление коммента
        })
    }
    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        CommentsAPI.getComments(lineup.id,currentPage).then(data=>{
            setComments([...comments,...data])
            setCurrentPage((prev)=>prev+1)
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
        });
    };
    useEffect(()=>{
        loadMoreData();
    },[])

    return (
        <Card style={{width:'100%', height:410}} title={"Комментарии"}>
            <Space direction={"vertical"} style={{height:'100%',justifyContent:"space-between", width:'100%', alignItems:'flex-start'}}>
                <Space style={{width:'100%'}}>
                    {comments.length > 0 ?
                        <div
                            id="scrollableDiv"
                            style={{
                                height: 260,
                                width:560,
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
                                        active={true}
                                        loading={loading}
                                    />
                                }
                                endMessage={<Divider plain>Больше нету 🤐</Divider>}
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    itemLayout="vertical"
                                    dataSource={comments}
                                    renderItem={(comment) =>
                                        <CommentItem
                                            comment={comment}
                                            onClickDeleteCommentAdmin={e=>handleClickDeleteCommentAdmin(e)}
                                            onClickDeleteCommentOwnerComment={e=>handleClickDeleteCommentOwnerComment(e)}
                                            onClickDeleteCommentOwnerLineup={e=>handleClickDeleteCommentOwnerLineup(e)}
                                            updateComments={()=>{
                                                setComments([]);
                                                setCurrentPage(1);
                                                loadMoreData();
                                            }}
                                        />
                                    }
                                />
                            </InfiniteScroll>
                        </div>
                        :
                        <h3>Оставьте комментарий первым</h3>
                    }
                </Space>
                {user.isAuth ?
                    <Space style={{width:560}}>
                        <Form
                            layout={"inline"}
                            name="basic"
                            onFinish={handleClickSubmitComment}
                            autoComplete="off"
                        >
                            <Form.Item
                                style={{width:420}}
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
            </Space>
        </Card>
    );
};

export default Comments;