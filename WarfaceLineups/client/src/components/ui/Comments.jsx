import React, {useContext, useState} from 'react';
import {Avatar, Button, Card, Form, Input, List, Space, Typography} from "antd";
import {Context} from "../../index";
import CommentsAPI from "../../http/api/CommentsAPI";


const { Link } = Typography;


const Comments = ({comments = new Array(), lineupId}) => {
    const[isVisibleEditing,setIsVisibleEditing] = useState(false);

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
        CommentsAPI.addComment(lineupId,values.text).then(data=>{

        })
    }

    return (
        <Space direction={"vertical"} style={{height:300,justifyContent:"space-between"}}>
            <Space>
                {comments.length > 0 ?
                    <List
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={(comment) => (
                            <List.Item actions={[
                                user.user.id === comment.ownerId && <Link onClick={()=>setIsVisibleEditing(true)}>Редактировать</Link>,
                                user.user.role === 'admin' && <Link onClick={()=>handleClickDeleteCommentAdmin(comment.id)}>Удалить как админ</Link>,
                                user.user.id === comment.ownerIdLineup ?
                                    <Link onClick={()=>handleClickDeleteCommentOwnerLineup(comment.id)}>Удалить</Link>
                                    :
                                    user.user.id === comment.ownerId && <Link onClick={()=>handleClickDeleteCommentOwnerComment(comment.id)}>Удалить</Link>,
                            ]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={`/api/avatar/${comment.ownerId}`}/>}
                                    title={<a href="https://ant.design">{comment.ownerLogin}</a>}
                                    description={comment.text}
                                />
                            </List.Item>
                        )}
                    />
                    :
                    <h3>Оставьте комментарий первым</h3>
                }
            </Space>
            {user.isAuth ?
                <Form
                    layout={"horizontal"}
                    name="basic"
                    onFinish={handleClickSubmitComment}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Комментарий"
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
                :
                <h4>Оставлять комментарии могут только авторизованные пользователи</h4>
            }
        </Space>
    );
};

export default Comments;