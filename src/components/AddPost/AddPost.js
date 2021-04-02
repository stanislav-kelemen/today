import React from 'react';
import { Auth } from 'aws-amplify';

import LoaderButton from '../../shared/LoaderButton';

import './AddPost.scss';

const AddPost = ({ onPostAdd, closeModal }) => {
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');

  const writePost = async (post) => {
    const userInfo = await Auth.currentAuthenticatedUser();
    const attributes = userInfo.attributes;

    const response = await fetch(`https://vly41lw5kg.execute-api.us-east-1.amazonaws.com/dev/posts`, {
      method: 'POST',
      body: JSON.stringify({
        ...post,
        userId: attributes.sub,
        author: `${attributes.given_name} ${attributes.family_name}`,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseJSON = await response.json();

    onPostAdd(responseJSON);

    return (responseJSON);
  }

  const handleSubmitAddPost = (e) => {
    e.preventDefault();

    const post = {
      title,
      text,
    }

    writePost(post);
    closeModal();
  };


  const handleTitleState = (e) => {
    e.preventDefault();

    return (
      setTitle(e.target.value)
    )
  };

  const handlePostState = (e) => {
    e.preventDefault();

    return (
      setText(e.target.value)
    )
  };

  return (
    <div className="addPostContainer">
      <form className="form" onSubmit={handleSubmitAddPost}>
        <label className="form-label">Title</label>
        <input
          className="form-input"
          id="title"
          placeholder="title"
          value={title}
          onChange={handleTitleState}
        />
        <label className="form-label">Post</label>
        <textarea
          className="form-textarea"
          id="post"
          placeholder="Add your post"
          value={text}
          onChange={handlePostState}
        />
        <LoaderButton className="button" color="primary" variant="contained" type="submit">Create new post</LoaderButton>
      </form>
    </div>
  )
}

export default AddPost;
