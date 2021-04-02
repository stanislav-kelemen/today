import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

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

const PostItemDetails = () => {
  const { postId } = useParams();
  const classes = useStyles();

  return (
    <Card className="card">
      <div className="singlePostContainer">
        <Card className={classes.post}>
          <p className="post-title">
            <Link to={`/post/${postId}`}>{title}</Link>
          </p>
          <p className="post-text">{text}</p>
          <div className="post-header">
            <div className="user-id">Author: {author}</div>
            <div className="post-date">Date: </div>
          </div>
        </Card>
          <div className="item-buttons">
            <Button className="deletePostButton" onClick={handleDelete} variant="contained" color="secondary">Delete my post</Button>
          </div>
      </div>
    </Card>
  );
};

export default PostItemDetails;