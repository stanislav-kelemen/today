import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { POSTS_URL } from '../../../constants/endpoints';
import { useAuthenticationContext } from '../../../shared/Authentication';

import LoaderButton from '../../../shared/LoaderButton';

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
  const [userSub, setUserSub] = useState('');
  const { isAuthenticated } = useAuthenticationContext();

  const handleDelete = () => {
    const deletePost = async (postId) => {
      const response = await fetch(`${POSTS_URL}/${postId}`, {
        method: 'DELETE',
        body: JSON.stringify({ userId })
      });

      await response.json();
      onDelete(postId);

      const userInfo = await Auth.currentAuthenticatedUser();

      setUserSub(userInfo.attributes.sub);
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

  const isDeleteAllowed = userId === userSub;

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
        {isAuthenticated && isDeleteAllowed &&
          <div className="item-buttons">
            <LoaderButton
              className="deletePostButton"
              onClick={handleDelete}
              variant="contained"
              color="secondary"
            >
              Delete post
            </LoaderButton>
          </div>
        }
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
