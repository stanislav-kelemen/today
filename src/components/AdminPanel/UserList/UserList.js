import React  from 'react';
import UserItem from '../UserItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const UserList = ({ users, onUserDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>User Email</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell colSpan="2" />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <UserItem
              name={user.name}
              email={user.email}
              onUserDelete={onUserDelete}
              id={user.id}
              key={user.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserList;
