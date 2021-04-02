import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination';
import Comment from './Comment/Comment';
import Form from './Form/Form';

import style from './Comments.module.scss';

const URL = 'https://tjbwnyrrrd.execute-api.us-east-1.amazonaws.com/dev/comments';

const Comments = () => {
    let [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [numberOfPages, setNumberOfPages] = React.useState(0);
    const itemsOnPage = 2;
   
    useEffect(() => {
        const fetchComments = async (url) => {
            const response = await fetch(`${url}?limit=${itemsOnPage}&page=${currentPage}`);
            const responseJSON = await response.json();

            console.log(numberOfPages)
            setNumberOfPages(responseJSON.commentsNum / responseJSON.comments.length);
            setComments(responseJSON.comments);
        };
        fetchComments(URL);
    }, [itemsOnPage, currentPage, numberOfPages]);

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
        <Comment key={comment.commentId} {...comment} onUpdate={onCommentUpdate} onDelete={onCommentDelete} commentId={comment.commentId}/>
    );
    console.log(numberOfPages);
    return comments.length && (
    <div className={style.container}>
        { comments.map(renderCommentItem)}
        <Form comments={comments} userId={comments[0].userId} postId={comments[0].postId} onAdd={onCommentAdd} setComments={setComments} />
        <Pagination
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          setCurrentPage={setCurrentPage}
        />
    </div>
    )
}

export default Comments
