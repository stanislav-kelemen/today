import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './UserForm.css';

const URL = `${process.env.REACT_APP_JSON_SERVER}`;

const UserForm = ({ removeModal, onUserAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const postUser = async (userObject) => {
    const response = await fetch(`${URL}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userObject)
    });
    const responseJSON = await response.json();

    return responseJSON;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name,
      email,
      password
    }
    const responseUser = await postUser(newUser);

    onUserAdd(responseUser);
    removeModal();
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
      <TextField
          id="outlined-full-width"
          label="User Name"
          style={{ margin: 8 }}
          placeholder="Alex"
          type="text"
          margin="normal"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <div className="form-row">
        <TextField
            id="outlined-full-width"
            label="User Email"
            style={{ margin: 8 }}
            placeholder="alex@gmail.com"
            type="email" 
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
      </div>
      <div className="form-row">
        <TextField
            id="outlined-full-width"
            label="User Email"
            style={{ margin: 8 }}
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
      </div>
      <div className="form-row">
        <Button variant="contained" color="primary" type="submit">Create User</Button>
      </div>
    </form>
  );
};

export default UserForm;