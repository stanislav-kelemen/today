import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

import PostItem from './PostItem';
import AddPost from '../AddPost';
import './PostsPage.css';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '500px',
    height: '500px'
  }
};

// const sortQuery = '?sort=date&descending=true';
const URL = `https://vly41lw5kg.execute-api.us-east-1.amazonaws.com/dev/posts`;

const PostsPage = () => {
  let [posts, setPosts] = React.useState([]);

  const [modalIsOpen,setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
 
  function closeModal(){
    setIsOpen(false);
  }
  
  React.useEffect(() => {
      const fetchPosts = async (url) => {
          const response = await fetch(url);
          const responseJSON = await response.json();
          setPosts(responseJSON);
      };
      fetchPosts(URL);
  }, []);

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

  const onPostAdd = (post) => {
    setPosts([...posts, post])
  }

  return (
      <div className="container">
          {posts.map(renderDropdownItem)}
          <div>
            
            <Button className="addPostButton" onClick={openModal} color="primary" variant="contained">Add Post</Button>
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

              <AddPost posts={posts} onPostAdd={onPostAdd} closeModal={closeModal}/>

            </Modal>
          </div>
      </div>
  )
}

export default PostsPage;
