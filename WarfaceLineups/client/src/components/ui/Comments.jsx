import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Divider, Form, Input, List, Skeleton, Space} from "antd";
import {Context} from "../../index";
import CommentsAPI from "../../http/api/CommentsAPI";
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentItem from "./CommentItem";






const Comments = ({lineup}) => {
    const [comments,setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);

    const {user} = useContext(Context);

    const handleClickDeleteCommentAdmin = (id) => {
        CommentsAPI.deleteCommentAdmin(id).then(data => {
            if (data.message === "success") {
                setComments((comments) => comments.filter(c => c.id !== id));
            }
        }).catch(e=>window.location.reload())
    }
    const handleClickDeleteCommentOwnerLineup = (id) =>{
        CommentsAPI.deleteCommentOwnerLineup(id).then(data => {
            if (data.message === "success") {
                setComments((comments) => comments.filter(c => c.id !== id));
            }
        }).catch()
    }
    const handleClickDeleteCommentOwnerComment = (id) =>{
        CommentsAPI.deleteCommentUser(id).then(data => {
            if (data.message === "success") {
                setComments((comments) => comments.filter(c => c.id !== id));
            }
        }).catch()
    }
    const handleClickSubmitComment = (values) =>{
        CommentsAPI.addComment(lineup.id,values.text).then(data=>{
            if(data.message === "success"){
                setComments(data.comments)
            }
        }).catch()
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
                                hasMore
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
                                            updateComment={(c,newText)=>{
                                                const newArr = comments;
                                                newArr[newArr.indexOf(c)].text = newText;
                                                setComments(newArr);
                                            }}
                                        />
                                    }
                                />
                            </InfiniteScroll>
                        </div>
                        :
                        user.isAuth && <h3 style={{marginBottom:230}}>Оставьте комментарий первым</h3>
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
                    <h3 style={{marginBottom:20}}>Оставлять комментарии могут только авторизованные пользователи</h3>
                }
            </Space>
        </Card>
    );
};

export default Comments;