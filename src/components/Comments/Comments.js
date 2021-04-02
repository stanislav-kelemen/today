import React, { useEffect, useState } from 'react'

import Comment from './Comment/Comment';
import Form from './Form/Form';

import style from './Comments.module.scss';

import { COMMENTS_URL } from '../../constants/endpoints';

const Comments = () => {
    let [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async (url) => {
            const response = await fetch(url);
            const responseJSON = await response.json();

            setComments(responseJSON);
        };

        fetchComments(COMMENTS_URL);
    }, []);

    const onCommentDelete = (commentId) => {
        const updatedComments = comments.filter(comment => comment.commentId !== commentId);

        setComments(updatedComments);
    }

    const onCommentAdd = (comment) => {
        setComments([...comments, comment]);
    }

    const onCommentUpdate = (updatedComment) => {
        const updatedComments = comments.filter(comment => comment.commentId !== updatedComment.commentId);
        setComments([...updatedComments, updatedComment]);
    }

    const renderCommentItem = (comment) => (
        <Comment key={comment.commentId} {...comment} onUpdate={onCommentUpdate} onDelete={onCommentDelete} commentId={comment.commentId} />
    );

    return comments.length && (
        <div className={style.container}>
            {comments.map(renderCommentItem)}
            <Form comments={comments} userId={comments[0].userId} postId={comments[0].postId} onAdd={onCommentAdd} setComments={setComments} />
        </div>
    )
}

export default Comments
