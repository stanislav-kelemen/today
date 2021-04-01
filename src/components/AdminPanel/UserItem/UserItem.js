import React from 'react';

import styles from './UserItem.module.scss';

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
    <tr className={styles['user-item']}>
      <td className={styles['user-item']}>{name}</td>
      <td className={styles['user-item']}>{email}</td>
      <td className={styles['user-item']}>{id}</td>
      <td className={styles['user-item']}>
        <button
          className={styles['delete-button']}
          type="button"
          onClick={() => deleteUser(id)}
        >
          Delete User
        </button>
      </td>
    </tr>
  )
}

export default UserItem;