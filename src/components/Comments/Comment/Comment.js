import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import ModalForm from './ModalForm';

import { COMMENTS_URL } from '../../../constants/endpoints';
import { useAuthenticationContext } from '../../../shared/Authentication';

import style from './Comment.module.scss';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px'
    }
};

const Comment = ({
    id,
    commentId,
    text,
    onDelete,
    onUpdate,
    userId,
    userName,
    createdAt
}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userSub, setUserSub] = useState('');
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const { isAuthenticated } = useAuthenticationContext();


    function openModal() {
        setIsOpen(true);
    }

    function closeModal(e) {

        setIsOpen(false);
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                if (isAuthenticated) {
                    const userInfo = await Auth.currentAuthenticatedUser();
                    const accessTokenPayload = userInfo.signInUserSession.getAccessToken()?.payload;

                    setIsAdmin(accessTokenPayload['cognito:groups']?.includes('admin'));
                    setUserSub(userInfo.attributes.sub);
                }
            } catch (e) {
            }
        };

        fetch();
    }, [isAuthenticated]);

    const handleDelete = () => {
        const deleteComment = async (commentId) => {

            const response = await fetch(`${COMMENTS_URL}/${commentId}`, {
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
    };

    const isDeleteAllowed = userId === userSub;

    return (
        <div className={style.comment}>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <ModalForm closeModal={closeModal} text={text} onUpdate={onUpdate} commentId={commentId} />
            </Modal>
            {isAuthenticated && (isAdmin || isDeleteAllowed) && <div className={style.buttons}>
                <Button className={style.update} variant="contained" type="button" onClick={openModal}>update</Button>
                <Button className={style.delete} variant="contained" color="secondary" type="button" onClick={handleDelete}>delete</Button>
            </div>}
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
