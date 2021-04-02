import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AWS from 'aws-sdk';
import Button from '@material-ui/core/Button';

import UserList from '../UserList';
import CustomModal from '../CustomModal';

import attributesToUser from '../../../helpers/attributesToUser';

import LoadingContainer from '../../../shared/LoadingContainer';

import styles from './AdminContainer.module.scss';

const getUsers = async () => {
  const params = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    AttributesToGet: [
      'given_name',
      'family_name',
      'sub',
      'email'
    ],
  };

  const cognitoProvider = new AWS.CognitoIdentityServiceProvider();

  const data = await cognitoProvider.listUsers(params).promise();

  return data.Users.map((user) => {
    return attributesToUser(user.Attributes);
  });
}

const AdminContainer = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setUsers(await getUsers());
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const params = {
      UserPoolId: process.env.REACT_APP_USER_POOL_ID,
      Username: userId,
    };
    const newUserList = users.filter(user => user.id !== userId);

    await cognito.adminDeleteUser(params).promise();
    setUsers(newUserList);
  }

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
    <LoadingContainer isLoading={isLoading}>
      <div className={`${styles.container} ${className}`}>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <CustomModal removeModal={closeModal} onUserAdd={onAdd}/>
        </Modal>
        <UserList users={users} onUserDelete={deleteUser}/>
        <Button variant="contained" color="primary" onClick={openModal}>
          Add User
        </Button>
      </div>
    </LoadingContainer>
  );
};

export default AdminContainer;
