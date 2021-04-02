import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import Pagination from '../Pagination';

import { useAuthenticationContext } from '../../shared/Authentication';

import { POSTS_URL } from '../../constants/endpoints';

import PostItem from './PostItem';
import AddPost from '../AddPost';
import './PostsPage.scss';

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

const PostsPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const itemsOnPage = 4;
  const { isAuthenticated } = useAuthenticationContext();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  React.useEffect(() => {
    const fetchPosts = async (url) => {
      const response = await fetch(`${url}?limit=${itemsOnPage}&page=${currentPage}`);
      const responseJSON = await response.json();

      setNumberOfPages(responseJSON.length / itemsOnPage)
      setPosts(responseJSON.posts);
    };

    fetchPosts(POSTS_URL);
  }, [currentPage]);

  const onDelete = (postId) => {
    const updatePosts = posts.filter(post => post.postId !== postId);

    setPosts(updatePosts);
  }

  const renderDropdownItem = (post) => (
    <PostItem
      key={post.postId}
      onDelete={onDelete}
      {...post}
    />
  );

  const onPostAdd = () => {
    const fetchPosts = async (url) => {
      const response = await fetch(`${url}?limit=${itemsOnPage}&page=${currentPage}`);
      const responseJSON = await response.json();

      setPosts(responseJSON.posts);
    };

    fetchPosts(POSTS_URL);
  }

  return (
    <div className="container">
      {posts.map(renderDropdownItem)}
      <div>
        {isAuthenticated && <Button className="addPostButton" onClick={openModal} color="primary" variant="contained">Add Post</Button>}
        <Pagination
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          setCurrentPage={setCurrentPage}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="modalHeader">
            <Button onClick={closeModal} variant="contained" color="secondary">close</Button>
          </div>
          <AddPost posts={posts} onPostAdd={onPostAdd} closeModal={closeModal} />
        </Modal>
      </div>
    </div>
  )
}

export default PostsPage;
