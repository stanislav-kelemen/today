import React from 'react';
import UserForm from '../UserForm';

import styles from './CustomModal.module.scss';

const CustomModal = ({ removeModal, onUserAdd }) => {
  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-row']}>
        <button className={styles['close-btn']} onClick={removeModal}>X</button>
      </div>
      <div className={styles['modal-row']}>
        <UserForm removeModal={removeModal} onUserAdd={onUserAdd}/>
      </div>
    </div>
  );
};

export default CustomModal;