import React from 'react';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import './PostItem.scss'

const useStyles = makeStyles(() => ({
  post: {
    backgroundColor: '#f8f9fa',
    width: '100%',
    height: '95%',
    // border: '1px solid rgb(199, 199, 199)',
    borderRadius: '10px',
    background: '#f8f9fa'
  }
}));


const PostItem = (props) => {
  const {
    postId,
    text,
    title,
    userId,
    createdAt,
    onDelete,
    author
  } = props;
  console.log(`userId`, userId)
  const classes = useStyles();
  const handleDelete = () => {
    const deletePost = async (postId) => {
      const response = await fetch(`https://vly41lw5kg.execute-api.us-east-1.amazonaws.com/dev/posts/${postId}`, {
          method: 'DELETE',
          body: JSON.stringify({userId})
        });

        await response.json();
        onDelete(postId)
      }
      deletePost(postId);
  }
  
  const getDataFormat = () => {
    const postDate = new Date(createdAt);
    const postDay = postDate.getDay();
    const postMonth = postDate.getMonth();
    const postYear = postDate.getFullYear();

    return (`${postDay}.${postMonth}.${postYear}`)
  }

  return (
    <Card className="card">
      <div className="singlePostContainer">
        <Card className={classes.post}>
          <p className="post-title">{title}</p>
          <p className="post-text">{text}</p>
          <div className="post-header">
            <div className="user-id">Author: {author}</div>
            <div className="post-date">Date: {getDataFormat()}</div>
          </div>
        </Card>
          <div className="item-buttons">
            <Button className="deletePostButton" onClick={handleDelete} variant="contained" color="secondary">Delete my post</Button>
          </div>
      </div>
    </Card>
  );
};

PostItem.propTypes = {
  postId: propTypes.string,
  title: propTypes.string,
  text: propTypes.string,
  userId: propTypes.string,
  time: propTypes.string
};

PostItem.defaultProps = {
  postId: '',
  title: '',
  text: '',
  userId: '',
  time: ''
};

export default PostItem;
