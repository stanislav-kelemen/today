import React from "react";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";

import { POSTS_URL } from "../../constants/endpoints";

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

// const sortQuery = '?sort=date&descending=true';
const URL = `https://vly41lw5kg.execute-api.us-east-1.amazonaws.com/dev/posts`;

const PostsPage = () => {
  const [posts, setPosts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const itemsOnPage = 2;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  React.useEffect(() => {
    const fetchPosts = async (url) => {
      const response = await fetch(
        `${url}?limit=${itemsOnPage}&page=${currentPage}`
      );
      const responseJSON = await response.json();

      setNumberOfPages(Math.ceil(responseJSON.postsNum / itemsOnPage));
      setPosts(responseJSON.posts);
    };
    fetchPosts(URL);
  }, [currentPage]);

  const onDelete = (postId) => {
    const updatePosts = posts.filter((post) => post.postId !== postId);

    setPosts(updatePosts);
  };

  const renderDropdownItem = (post) => (
    <PostItem key={post.postId} onDelete={onDelete} {...post} />
  );
  console.log(numberOfPages);
  const onPostAdd = () => {
    const fetchPosts = async (url) => {
      const response = await fetch(`${url}?limit=${2}&page=${currentPage}`);
      const responseJSON = await response.json();

      setPosts(responseJSON.posts);
    };

    fetchPosts(POSTS_URL);
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      {posts.map(renderDropdownItem)}
      <div>
        <Button
          className="addPostButton"
          onClick={openModal}
          color="primary"
          variant="contained"
        >
          Add Post
        </Button>

        <div className="paginationContainer">
          <Pagination
            count={numberOfPages}
            page={currentPage}
            onChange={handleChange}
            siblingCount={0}
            boundaryCount={1}
            color="primary"
          />
        </div>

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
  );
};

export default PostsPage;
