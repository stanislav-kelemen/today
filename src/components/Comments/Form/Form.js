import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import Input from './Input/Input';
import { COMMENTS_URL } from '../../../constants/endpoints'

import style from './Form.module.scss';

const Form = ({ userId, postId, closeModal, onAdd }) => {
    const [text, setText] = useState('');
    const [name, setName] = useState('');

    const postComment = async (post) => {
        await fetch(COMMENTS_URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        
        closeModal();
    }

   const handleName = (e) => {    
    setName(e.target.value);
   }

   const handleText = (e) => {
    setText(e.target.value);
   }

   const addComment = (e) => {
       e.preventDefault();

       const post = {
           userId,
           postId,
           text,
           userName: name
       }
       onAdd(post);
        postComment(post)
   }

    return (
        <form className={style.form} onSubmit={addComment}>
            <h2 className={style.title}>Add a comment</h2>
            <div  className={style.inputs}>
                <div className={style.wrapper}>
                    <Input handleChange={handleName}/>
                </div>
                <textarea className={style.comment} onChange={handleText} placeholder="Enter your comment" />
            </div>
            <Button color="primary" variant="contained" className={style.addBtn }type="submit">Add Comment</Button>
        </form>
    )
}

export default Form
