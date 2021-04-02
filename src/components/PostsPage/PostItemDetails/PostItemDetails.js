import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Card from '@material-ui/core/Card';
import LoaderButton from '../../../shared/LoaderButton';
import Comment from '../../Comments/Comment/Comment';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Form from '../../Comments/Form/Form';
import { makeStyles } from '@material-ui/core/styles';
import { POST_URL } from '../../../constants/endpoints';
import { POSTS_URL } from '../../../constants/endpoints';
import { COMMENT_URL } from '../../../constants/endpoints';

import LoadingContainer from '../../../shared/LoadingContainer';
import { useAuthenticationContext } from '../../../shared/Authentication';

import styles from './PostItemDetails.module.scss';
import '../PostItem/PostItem.scss';

const useStyles = makeStyles(() => ({
  post: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px'
  }
}));


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '300px'
  }
};

const PostItemDetails = () => {
  const { postId } = useParams();
  const { goBack } = useHistory();
  const classes = useStyles();
  const [postDetails, setPostDetails] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [userSub, setUserSub] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated } = useAuthenticationContext();

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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(e) {

    setIsOpen(false);
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchPost = async (postId) => {
      const response = await fetch(`${POST_URL}/${postId}`);
      const responseJSON = await response.json();

      setPostDetails(responseJSON);

      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const accessTokenPayload = userInfo.signInUserSession.getAccessToken()?.payload;

        setIsAdmin(accessTokenPayload['cognito:groups']?.includes('admin'));
        setUserSub(userInfo.attributes.sub);
      } catch (e) {

      }
    };

    const fetchComments = async (postId) => {
      const response = await fetch(`${COMMENT_URL}/post/${postId}`);
      const responseJSON = await response.json();

      setComments(responseJSON.comments);
    };


    fetchComments(postId)
    fetchPost(postId);
    setIsLoading(false);
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

  const isDeleteAllowed = postDetails?.userId === userSub;

  return (
    Object.values(postDetails).length && (
      <Card className={`${classes.post} card`}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <Form userId={postDetails.userId} postId={postId} closeModal={closeModal} onAdd={onCommentAdd} />
        </Modal>
        <LoadingContainer isLoading={isLoading}>
          <div className={`wrapper ${styles.wrapper}`}>
            <p className="post-title">
              <Link to={`/post/${postId}`}>{postDetails.title}</Link>
            </p>
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
          <p className="post-text">{postDetails.text}</p>
          <div className="comments">
            {comments.map(comment => <Comment key={comment.commentId} commentId={comment.commentId} text={comment.text} userName={comment.userName} createdAt={comment.createdAt} onDelete={onCommentDelete} onUpdate={onCommentUpdate} />)}
          </div>
          <div className="post-header">
            <div className="user-id">Author: {postDetails.author}</div>
            <Button
              onClick={openModal}
              color="primary"
              variant="contained"
            >
              Write a comment
            </Button>
            <div className="post-date">Date: {getDataFormat()}</div>
          </div>
        </LoadingContainer>
      </Card>)
  );
};

export default PostItemDetails;
