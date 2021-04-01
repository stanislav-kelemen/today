import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CustomModal from '../CustomModal';
import UserList from '../UserList';

import styles from './AdminContainer.modules.scss';

const URL = `${process.env.REACT_APP_JSON_SERVER}`;

const AdminContainer = () => {
  const [users, setUsers] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  useEffect(() => {
    const fetchUsers = async (url) => {
      const response = await fetch(url);
      const responseJSON = await response.json();
  
      setUsers(responseJSON);
    };

    fetchUsers(`${URL}/users`);
  }, []);

  const onDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);

    setUsers(updatedUsers);
  };

  const onAdd = (userObject) => {
    setUsers([...users, userObject]);
  }

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  return (
    <div className={styles['container']}>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CustomModal removeModal={closeModal} onUserAdd={onAdd}/>
      </Modal>
      <UserList users={users} onUserDelete={onDelete}/>
      <button className={styles['add-btn']} onClick={openModal}>Add User</button>
    </div>
  );
};

export default AdminContainer;