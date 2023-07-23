import React, {useContext, useState} from 'react';
import {Avatar, Card, List, Space, Typography} from "antd";
import {Context} from "../../index";


const { Link } = Typography;


const Comments = ({comments = new Array()}) => {
    const[isVisibleEditing,setIsVisibleEditing] = useState(false);

    const {user} = useContext(Context);

    const handleClickDeleteCommentAdmin = (id) => {

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
                                user.user.id === comment.ownerIdLineup && <Link onClick={()=>handleClickDeleteCommentAdmin(comment.id)}>Удалить</Link>
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
            <Card>

            </Card>
        </Space>
    );
};

export default Comments;