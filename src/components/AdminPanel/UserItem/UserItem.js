import React, { useEffect, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { Auth } from 'aws-amplify';
import { onError } from '../../../libs/errorLib';

import styles from './UserItem.module.scss';

const UserItem = ({ name, email, id, onUserDelete }) => {
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const session = await Auth.currentSession();
        const getIdTokenPayload = session.getIdToken().payload;

        setIsAdmin(getIdTokenPayload.sub === id);
      } catch (e) {
        onError(e);
      }
    };

    checkAdmin();
  });

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{id}</TableCell>
      <TableCell>
        {!isAdmin ? (
          <Button
            className={styles.deleteButton}
            variant="contained"
            type="button"
            onClick={() => onUserDelete(id)}
          >
            Delete User
          </Button>
        ) : (
          <div className={styles.adminText}>admin</div>
        )}
      </TableCell>
    </TableRow>
  )
}

export default UserItem;
