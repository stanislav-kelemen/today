import React from 'react';
import Button from '@material-ui/core/Button';

import './AddPost.css';
// import fetchPosts from './fetchPost';

const AddPost = ({ onPostAdd, closeModal, ...posts }) => {
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');

  const writePost = async (post) => {
    const response = await fetch(`https://vly41lw5kg.execute-api.us-east-1.amazonaws.com/dev/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
          'Content-Type': 'application/json'
      }}
    )
    const responseJSON = await response.json();
    
    onPostAdd(responseJSON);

    return(responseJSON);

  }

  const addPost = (e) => {
    e.preventDefault();

    const post = {
      title,
      text,
      userId: "posts.userId"
    }

    writePost(post);
    closeModal();
  }

  // fetchPosts(addPost);

  const handleTitleState = (e) => {
    e.preventDefault();

    return (
      setTitle(e.target.value) 
    )
  }

  const handlePostState = (e) => {
    e.preventDefault();

    return (
      setText(e.target.value) 
    )
  }

  return (
      <div className="addPostContainer">
        <form className="form" onSubmit={addPost}>
          <label className="form-label">Title</label>
          <input 
            className="form-input" 
            id="title" 
            placeholder="title"
            value={title}
            onChange={handleTitleState}
          ></input>

          <label className="form-label">Post</label>
          <textarea 
            className="form-textarea" 
            id="post" 
            placeholder="Add your post"
            value={text}
            onChange={handlePostState}
          ></textarea>

            <Button className="button" color="primary" variant="contained" onClick={addPost}>Create new post</Button>
        </form>
      </div>
  )
}

export default AddPost;