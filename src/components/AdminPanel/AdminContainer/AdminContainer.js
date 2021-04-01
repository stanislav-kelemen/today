import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CustomModal from '../CustomModal';
import UserList from '../UserList';

import AWS from 'aws-sdk';

import styles from './AdminContainer.module.scss';

const getUsers = () => {
  const params = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    AttributesToGet: [
      'given_name',
      'family_name',
      'sub',
      'email'
    ],
  };

  return new Promise((resolve, reject) => {
    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
    });

    var cognitoProvider = new AWS.CognitoIdentityServiceProvider();

    cognitoProvider.listUsers(params, (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        const usersList = data.Users.map((user) => {
          const attributes = user.Attributes;
          const userObj  = {};
          const namesObj = {};

          attributes.forEach((attribute) => {
            const name = attribute.Name;
            const value = attribute.Value;

            switch (name) {
              case 'given_name':
                namesObj.firstName = value;
                break;
              case 'family_name':
                namesObj.lastName = value;
                break;
              case 'email':
                userObj.email = value;
                break;
              case 'sub':
                userObj.id = value;
                break;
              default:
                break;
            }
          });
          
          userObj.name = `${namesObj.firstName} ${namesObj.lastName}`;

          return userObj;
        });

        console.log(usersList);
        resolve(usersList);
      }
    })
  });
}

const AdminContainer = () => {
  const [users, setUsers] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await getUsers());
    };

    fetchUsers();
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
