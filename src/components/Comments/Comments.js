import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

import Comment from "./Comment/Comment";
import Form from "./Form/Form";

import { COMMENTS_URL } from "../../constants/endpoints";

import style from "./Comments.module.scss";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const itemsOnPage = 3;

  useEffect(() => {
    const fetchComments = async (url) => {
      const response = await fetch(
        `${url}?limit=${itemsOnPage}&page=${currentPage}`
      );
      const responseJSON = await response.json();

      setNumberOfPages(Math.ceil(responseJSON.commentsNum / itemsOnPage));
      setComments(responseJSON.comments);
    };

    fetchComments(COMMENTS_URL);
  }, [itemsOnPage, currentPage, numberOfPages]);

  const onCommentDelete = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.commentId !== commentId
    );

    setComments(updatedComments);
  };

  const onCommentAdd = (comment) => {
    setComments([...comments, comment]);
  };

  const onCommentUpdate = (updatedComment) => {
    const updatedComments = comments.filter(
      (comment) => comment.commentId !== updatedComment.commentId
    );
    setComments([...updatedComments, updatedComment]);
  };

  const renderCommentItem = (comment) => (
    <Comment
      key={comment.commentId}
      userName={comment.userName}
      createdAt={comment.createdAt}
      {...comment}
      onUpdate={onCommentUpdate}
      onDelete={onCommentDelete}
      commentId={comment.commentId}
    />
  );

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  console.log(comments);

  return (
    comments.length && (
      <div className={style.container}>
        {comments.map(renderCommentItem)}
        <Form
          comments={comments}
          userId={comments[0].userId}
          postId={comments[0].postId}
          onAdd={onCommentAdd}
          setComments={setComments}
        />
        <div className={style.paginationContainer}>
          <Pagination
            count={numberOfPages}
            page={currentPage}
            onChange={handleChange}
            siblingCount={0}
            boundaryCount={1}
            color="primary"
          />
        </div>
      </div>
    )
  );
};

export default Comments;
