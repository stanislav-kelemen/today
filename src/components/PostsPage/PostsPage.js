import React from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";

import { POSTS_URL } from "../../constants/endpoints";
import { useAuthenticationContext } from "../../shared/Authentication";

import LoadingContainer from '../../shared/LoadingContainer';

import PostItem from "./PostItem";
import AddPost from "../AddPost";
import "./PostsPage.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "500px",
  },
};

const PostsPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
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
      setIsLoading(true);
      const response = await fetch(
        `${url}?limit=${itemsOnPage}&page=${currentPage}`
      );
      const responseJSON = await response.json();

      setNumberOfPages(Math.ceil(responseJSON.postsNum / itemsOnPage));
      setPosts(responseJSON.posts);
      setIsLoading(false);
    };

    fetchPosts(POSTS_URL);
  }, [currentPage]);

  const onDelete = (postId) => {
    const updatePosts = posts.filter((post) => post.postId !== postId);

    setPosts(updatePosts);
  };

  const renderPostItem = (post) => (
    <PostItem
      key={post.postId}
      onDelete={onDelete}
      {...post}
    />
  );
  const onPostAdd = () => {
    const fetchPosts = async (url) => {
      const response = await fetch(
        `${url}?limit=${itemsOnPage}&page=${currentPage}`
      );
      const responseJSON = await response.json();

      setPosts(responseJSON.posts);
    };

    fetchPosts(POSTS_URL);
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <LoadingContainer isLoading={isLoading}>
      <div className="container">
        {posts.map(renderPostItem)}
        <div>
          {isAuthenticated && (
            <Button
              className="addPostButton"
              onClick={openModal}
              color="primary"
              variant="contained"
            >
              Add Post
            </Button>
          )}

          { posts.length >= itemsOnPage && <div className="paginationContainer">
            <Pagination
              count={numberOfPages}
              page={currentPage}
              onChange={handleChange}
              siblingCount={0}
              boundaryCount={1}
              color="primary"
            />
          </div> }

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <div className="modalHeader">
              <Button onClick={closeModal} variant="contained" color="secondary">
                close
              </Button>
            </div>

            <AddPost
              posts={posts}
              onPostAdd={onPostAdd}
              closeModal={closeModal}
            />
          </Modal>
        </div>
      </div>
    </LoadingContainer>
  );
};

export default PostsPage;
