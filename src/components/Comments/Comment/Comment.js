import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import ModalForm from './ModalForm';

import style from './Comment.module.scss';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '500px',
    height                : '500px'
  }
};

const URL = 'https://tjbwnyrrrd.execute-api.us-east-1.amazonaws.com/dev/comments';

const Comment = ( {
    id, 
    commentId,
    text,
    time,
    onDelete,
    onUpdate
     }) => {

        const [modalIsOpen,setIsOpen] = React.useState(false);
        function openModal() {
          setIsOpen(true);
        }
    
        function closeModal(e){
            
          setIsOpen(false);
        }

         const handleDelete = () => {
            const deleteComment = async (commentId) => {

            const response = await fetch (`${URL}/${commentId}`,{
                method: "DELETE"
            });

            await response.json();

            onDelete(commentId);
        }

        deleteComment(commentId);
    }

    return (        
        <div className={style.comment}>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <ModalForm closeModal={closeModal} text={text} onUpdate={onUpdate} commentId={commentId}/>
            </Modal>
            <div  className={style.buttons}>
                <Button className={style.update}  variant="contained" type="button" onClick={openModal}>update</Button>
                <Button className={style.delete}  variant="contained" color="secondary" type="button" onClick={handleDelete}>delete</Button>
            </div>
            <div className={style.container}>
                <img className={style.avatarImg} src="../../../assets/avatar.png" alt={id} ></img>
                <div className={style.wrapper}>
                    <h2 className={style.name}>{id}</h2>
                    <h5 className={style.date}>{time}</h5>
                    <p className={style.text}>{text}</p>
                </div>
            </div>
        </div>                                
       
    )
}

export default Comment;