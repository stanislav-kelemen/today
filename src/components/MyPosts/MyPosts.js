import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from "@material-ui/lab/Pagination";

import { Auth } from 'aws-amplify';

import ROUTES from '../../constants/routePaths';
import { POSTS_URL } from '../../constants/endpoints';
import { useAuthenticationContext } from '../../shared/Authentication';

import PostItem from '../PostsPage/PostItem';
import './MyPosts.scss';

import LoadingContainer from '../../shared/LoadingContainer';

const MyPosts = () => {
  const history = useHistory();
  const { isAuthenticated } = useAuthenticationContext();

  if (!isAuthenticated) {
    history.push(ROUTES.HOME);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [userId, setUserId] = useState();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemsOnPage = 4;

  useEffect(() => {
    const fetchPosts = async (url) => {
      setIsLoading(true);

      const userInfo = await Auth.currentAuthenticatedUser();

      setUserId(userInfo.attributes.sub);

      const response = await fetch(`${url}/user/${userId}?limit=${itemsOnPage}&page=${currentPage}`);

      const responseJSON = await response.json();

      setNumberOfPages(Math.floor(responseJSON.postsNum / itemsOnPage))
      setPosts(responseJSON.posts);
      setIsLoading(false);
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
    <>
      <LoadingContainer isLoading={isLoading}>
        <div className="container">
          {posts.map(renderPostItem)}
        </div>

      </LoadingContainer>
      <div className="paginationContainer">
        {posts.length >= itemsOnPage && (
          <Pagination
            count={numberOfPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        )}
      </div>
    </>
  )
};

export default MyPosts;
