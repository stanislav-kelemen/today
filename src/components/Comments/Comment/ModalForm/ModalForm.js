import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { COMMENTS_URL } from '../../../../constants/endpoints'

import style from './ModalForm.module.scss';

const ModalForm = ({ closeModal, text, onUpdate, commentId }) => {
    const [newText, setnewText] = useState(text);

    const handleText = (e) => {
        setnewText(e.target.value);
    }

    const updateComment = async (post) => {
        const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        const responseJSON = await response.json();

        onUpdate({commentId, text: responseJSON.Attributes.text});
    }

    const onCommentUpdate = (e) => {
        e.preventDefault();
 
        const post = {
            text: newText
        };
        updateComment(post);
        closeModal();
    }

    return (
        <form className={style.form} onSubmit={onCommentUpdate}>
            <div className={style.row}>
                <Button className={style.close} variant='contained' color='secondary' onClick={closeModal}>X</Button>
            </div>
            <div className={style.row}>
                <textarea className={style.comment} value={newText} onChange={handleText}/>
            </div>
            <div className={style.row}>
                <Button className={style.update} variant='contained' color='primary' type='submit'>Update</Button>
            </div>
        </form>
    )
}

export default ModalForm
