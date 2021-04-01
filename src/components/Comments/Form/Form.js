import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Input from './Input/Input';

import style from './Form.module.scss';

const URL = 'https://tjbwnyrrrd.execute-api.us-east-1.amazonaws.com/dev/comments';

const useStyles = makeStyles(() => ({
    button: {
      fontSize: '1.3rem',
      width: '100%'
    }
  }));


  

const Form = ({ userId, postId,  onAdd }) => {
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const classes = useStyles();

    const postComment = async (post) => {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        const responseJSON = await response.json();

        onAdd(responseJSON);
    }

   const handleName = (e) => {    
    setName(e.target.value);
   }

   const handleEmail = (e) => {
    setEmail(e.target.value);
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
           name,
           email
       }
    postComment(post)
   }

    return (
        <form className={style.form} onSubmit={addComment}>
            <h2 className={style.title}>Add a comment</h2>
            <div  className={style.inputs}>
                <textarea className={style.comment} onChange={handleText} placeholder="Enter your comment, please" />
                <div className={style.wrapper}>
                    <Input title="User Name" type="name" handleChange={handleName}/>
                    <Input title="Email" type="email" handleChange={handleEmail}/>
                </div>
            </div>
            <Button color="primary" variant="contained" className={classes.button} type="submit">Add Comment</Button>
        </form>
    )
}

export default Form