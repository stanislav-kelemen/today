import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { POST_URL } from '../../../constants/endpoints';
import { POSTS_URL } from '../../../constants/endpoints';

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
  
  useEffect(() => {
    const fetchPost = async (id) => {
      const response = await fetch(`${POST_URL}/${postId}`);
      const responseJSON = await response.json();
      console.log(responseJSON)
      setPostDetails(responseJSON);
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

  return Object.values(postDetails).length && (
    <Card className="card">
      <div className="singlePostContainer">
        <Card className={classes.post}>
          <p className="post-title">
            {postDetails.title}
          </p>
          <p className="post-text">{postDetails.text}</p>
          <div className="post-header">
            <div className="user-id">Author: {postDetails.author}</div>
            <div className="post-date">Date: {getDataFormat()}</div>
          </div>
        </Card>
          <div className="item-buttons">
            <Button className="deletePostButton" variant="contained" onClick={handleDelete} color="secondary">Delete my post</Button>
          </div>
      </div>
    </Card>
  );
};

export default PostItemDetails;