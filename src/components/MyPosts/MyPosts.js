import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { Auth } from 'aws-amplify';

import ROUTES from '../../constants/routePaths';
import { POSTS_URL } from '../../constants/endpoints';
import { useAuthenticationContext } from '../../shared/Authentication';

import PostItem from '../PostsPage/PostItem';
import './MyPosts.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '500px'
  }
};

const MyPosts = () => {
  const history = useHistory();
  const { isAuthenticated } = useAuthenticationContext();

  if (!isAuthenticated) {
    history.push(ROUTES.HOME);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [userId, setUserId] = useState();
  const [posts, setPosts] = useState();
  const itemsOnPage = 4;

  useEffect(() => {
    const fetchPosts = async (url) => {
      const userInfo = await Auth.currentAuthenticatedUser();

      setUserId(userInfo.attributes.sub);

      const response = await fetch(`${url}/?limit=${itemsOnPage}&page=${currentPage}`, {
        method: 'GET',
        body: JSON.stringify({
          userId: userId,
        }),
      });
      
      const responseJSON = await response.json();

      setNumberOfPages(responseJSON.length / itemsOnPage)
      setPosts(responseJSON.posts);
    };

    fetchPosts(POSTS_URL);
  }, [userId, itemsOnPage, currentPage]);

  const onDelete = (postId) => {
    const updatePosts = posts.filter(post => post.postId !== postId);

    setPosts(updatePosts);
  }

  const renderPostItem = (post) => (
    <PostItem
      key={post.postId}
      onDelete={onDelete}
      {...post}
    />
  );

  return (
    <div className="container">
      {posts.map(renderPostItem)}
    </div>
  )
};

export default MyPosts;
