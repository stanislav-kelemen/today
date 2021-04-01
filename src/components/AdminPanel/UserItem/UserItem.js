import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import './UserItem.css';

const URL = `${process.env.REACT_APP_JSON_SERVER}`;

const UserItem = ({ name, email, id, onUserDelete }) => {
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${URL}/users/${id}`, {
        method: 'DELETE'
      });
      
      await response.json();

      onUserDelete(id);
    } catch (error) {
      return null;
    }
  };

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          type="button"
          onClick={() => deleteUser(id)}
        >
          Delete User
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default UserItem;