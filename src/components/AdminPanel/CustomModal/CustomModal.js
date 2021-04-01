import React from 'react';
import UserForm from '../UserForm';
import Button from '@material-ui/core/Button';

import styles from './CustomModal.module.scss';

const CustomModal = ({ removeModal, onUserAdd }) => {
  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-row']}>
      <Button variant="contained" color="secondary" onClick={removeModal}>
        X
      </Button>
      </div>
      <div className={styles['modal-row']}>
        <UserForm removeModal={removeModal} onUserAdd={onUserAdd}/>
      </div>
    </div>
  );
};

export default CustomModal;
