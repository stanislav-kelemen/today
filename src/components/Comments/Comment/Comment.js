import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import ModalForm from './ModalForm';

import { COMMENTS_URL } from '../../../constants/endpoints';

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

const Comment = ( {
    id, 
    commentId,
    text,
    onDelete,
    onUpdate,
    userName,
    createdAt
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

            const response = await fetch (`${COMMENTS_URL}/${commentId}`,{
                method: "DELETE"
            });

            await response.json();

            onDelete(commentId);
        }

        deleteComment(commentId);
    }

    const getDataFormat = () => {
        const postDate = new Date(createdAt);
        const postDay = postDate.getDay();
        const postMonth = postDate.getMonth();
        const postYear = postDate.getFullYear();
    
        return (`${postDay}.${postMonth}.${postYear}`)
      }

      console.log(`getDataFormat`, getDataFormat);
      console.log(`userName`, userName)

    return (        
        <div className={style.comment}>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
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
                    <h2 className={style.name}>{userName}</h2>
                    <h5 className={style.date}>{getDataFormat()}</h5>
                    <p className={style.text}>{text}</p>
                </div>
            </div>
        </div>                                
       
    )
}

export default Comment;
