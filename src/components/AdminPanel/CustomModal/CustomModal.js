import React from 'react';
import UserForm from '../UserForm';
import Button from '@material-ui/core/Button';

import './CustomModal.css';

const CustomModal = ({ removeModal, onUserAdd }) => {
  return (
    <div className="modal-container">
      <div className="modal-row">
      <Button variant="contained" color="secondary" onClick={removeModal} className="close-btn">
        X
      </Button>
      </div>
      <div className="modal-row">
        <UserForm removeModal={removeModal} onUserAdd={onUserAdd}/>
      </div>
    </div>
  );
};

export default CustomModal;