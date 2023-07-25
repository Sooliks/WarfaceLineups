import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Form, Input, List, Modal, Typography} from "antd";
import {Context} from "../../index";
import ModalOtherProfile from "../ModalOtherProfile";
import CommentsAPI from "../../http/api/CommentsAPI";

const { Link } = Typography;

const CommentItem = ({comment, onClickDeleteCommentOwnerComment, onClickDeleteCommentOwnerLineup,onClickDeleteCommentAdmin, updateComments}) => {
    const {user} = useContext(Context);
    const [actions,setActions] = useState([]);
    const [, updateState] = React.useState();
    const [isVisibleProfile,setIsVisibleProfile] = useState(false);
    const [isVisibleEditing,setIsVisibleEditing] = useState(false)
    const forceUpdate = React.useCallback(() => updateState({}), []);
    useEffect(()=>{
        if(user.user.id === comment.ownerId){
            const newArr = actions;
            newArr.push(<Link onClick={()=>setIsVisibleEditing(true)}>Редактировать</Link>);
            setActions(newArr)
        }
        if(user.role === 'admin'){
            const newArr = actions;
            newArr.push(<Link onClick={()=>onClickDeleteCommentAdmin(comment.id)}>Удалить как админ</Link>)
            setActions(newArr)
        }
        if(user.user.id === comment.ownerIdLineup){
            const newArr = actions;
            newArr.push(<Link onClick={()=>onClickDeleteCommentOwnerLineup(comment.id)}>Удалить</Link>);
            setActions(newArr)
        } else if(user.user.id === comment.ownerId) {
            const newArr = actions;
            newArr.push(<Link onClick={()=>onClickDeleteCommentOwnerComment(comment.id)}>Удалить</Link>)
            setActions(newArr)
        }
        forceUpdate();
    },[])

    const submitUpdateComment = (values) => {
        CommentsAPI.updateComment(comment.id,values.comment).then(data=>{
            if(data.message==="success"){
                setIsVisibleEditing(false);
                updateComments();
            }
        })
    }

    return (
        <List.Item style={{width:'100%'}} actions={[...actions]}>
            <List.Item.Meta
                avatar={<Avatar src={`/api/avatar/${comment.ownerId}`}/>}
                title={<Link onClick={()=>setIsVisibleProfile(true)}>{comment.ownerLogin}</Link>}
                description={comment.text}
            />
            {isVisibleProfile &&
                <ModalOtherProfile ownerId={comment.ownerId} onClose={()=>setIsVisibleProfile(false)}/>
            }
            <Modal
                open={isVisibleEditing}
                onCancel={()=>setIsVisibleEditing(false)}
                footer={[]}
            >
                <Form
                    layout={"vertical"}
                    name="basic"
                    onFinish={submitUpdateComment}
                    autoComplete="off"
                    style={{marginTop:30,width:'99%'}}
                >
                    <Form.Item
                        label=""
                        name="comment"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста измените комментарий',
                            },
                        ]}
                    >
                        <Input defaultValue={comment.text} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Изменить</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </List.Item>
    );
};

export default CommentItem;