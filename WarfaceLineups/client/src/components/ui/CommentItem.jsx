import React, {useContext, useEffect, useState} from 'react';
import {Avatar, List, Typography} from "antd";
import {Context} from "../../index";
import ModalOtherProfile from "../ModalOtherProfile";

const { Link } = Typography;

const CommentItem = ({comment, onClickDeleteCommentOwnerComment, onClickDeleteCommentOwnerLineup,onClickDeleteCommentAdmin, onClickEditing}) => {
    const {user} = useContext(Context);
    const [actions,setActions] = useState([]);
    const [, updateState] = React.useState();
    const [isVisibleProfile,setIsVisibleProfile] = useState(false);
    const forceUpdate = React.useCallback(() => updateState({}), []);
    useEffect(()=>{
        if(user.user.id === comment.ownerId){
            const newArr = actions;
            newArr.push(<Link onClick={()=>onClickEditing()}>Редактировать</Link>);
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
        </List.Item>
    );
};

export default CommentItem;