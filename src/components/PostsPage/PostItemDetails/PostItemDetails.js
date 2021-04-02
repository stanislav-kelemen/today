import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import LoaderButton from '../../../shared/LoaderButton';
import { makeStyles } from '@material-ui/core/styles';
import { POST_URL } from '../../../constants/endpoints';
import { POSTS_URL } from '../../../constants/endpoints';

import LoadingContainer from '../../../shared/LoadingContainer';

import '../PostItem/PostItem.scss';

const useStyles = makeStyles(() => ({
  post: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px'
  }
}));

const PostItemDetails = () => {
  const { postId } = useParams();
  const { goBack } = useHistory();
  const classes = useStyles();
  const [postDetails, setPostDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchPost = async (id) => {
      setIsLoading(true);
      const response = await fetch(`${POST_URL}/${postId}`);
      const responseJSON = await response.json();
      
      setPostDetails(responseJSON);
      setIsLoading(false);
    };

    fetchPost(postId);
  }, [postId]);

  const getDataFormat = () => {
    const postDate = new Date(postDetails.createdAt);
    const postDay = postDate.getDay();
    const postMonth = postDate.getMonth();
    const postYear = postDate.getFullYear();

    return (`${postDay}.${postMonth}.${postYear}`)
  }

  const handleDelete = () => {
    const deletePost = async (postId) => {
      const response = await fetch(`${POSTS_URL}/${postId}`, {
        method: 'DELETE',
        body: JSON.stringify({ userId: postDetails.userId })
      });

      await response.json();

      goBack();
    }
    deletePost(postId);
  }

  return (
    <LoadingContainer isLoading={isLoading}>
      { Object.values(postDetails).length && (
      <Card className={`${classes.post} card`}>
        <div className="wrapper">
            <p className="post-title">
              <Link to={`/post/${postId}`}>{postDetails.title}</Link>
            </p>
            <div className="item-buttons">
              <LoaderButton
                className="deletePostButton"
                onClick={handleDelete}
                variant="contained"
                color="secondary"
              >
                Delete my post
              </LoaderButton>
            </div>
        </div>
        <p className="post-text">{postDetails.text}</p>
        <div className="post-header">
          <div className="user-id">Author: {postDetails.author}</div>
          <div className="post-date">Date: {getDataFormat()}</div>
        </div>
      </Card>)}
    </LoadingContainer>
  );
};

export default PostItemDetails;
