import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { POSTS_URL } from '../../../constants/endpoints';
import { useAuthenticationContext } from '../../../shared/Authentication';

import LoaderButton from '../../../shared/LoaderButton';

import './PostItem.scss'

const useStyles = makeStyles(() => ({
  post: {
    borderRadius: '10px'
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

  const classes = useStyles();
  const [userSub, setUserSub] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { isAuthenticated } = useAuthenticationContext();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const accessTokenPayload = userInfo.signInUserSession.getAccessToken()?.payload;

        setIsAdmin(accessTokenPayload['cognito:groups']?.includes('admin'));
        setUserSub(userInfo.attributes.sub);
      } catch(e) {

      }
    }

    getUserInfo();
  }, []);

  const handleDelete = () => {
    const deletePost = async (postId) => {
      const response = await fetch(`${POSTS_URL}/${postId}`, {
        method: 'DELETE',
        body: JSON.stringify({ userId })
      });

      await response.json();
      onDelete(postId);
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
      <Card className={`${classes.post} card`}>
        <div className="wrapper">
            <Link className="post-title" to={`/post/${postId}`}>{title}</Link>
            {isAuthenticated && (isDeleteAllowed || isAdmin) &&
            <div className="item-buttons">
              <LoaderButton
                className="deletePostButton"
                onClick={handleDelete}
                variant="contained"
                color="secondary"
              >
                Delete my post
              </LoaderButton>
            </div>}
        </div>
        <p className="post-text">{text}</p>
        <div className="post-header">
          <div className="user-id">Author: {author}</div>
          <div className="post-date">Date: {getDataFormat()}</div>
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
