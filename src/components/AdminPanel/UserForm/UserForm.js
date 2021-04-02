import React, { useState } from 'react';
import AWS from 'aws-sdk';
import TextField from '@material-ui/core/TextField';
import LoaderButton from '../../../shared/LoaderButton';

import attributesToUser from '../../../helpers/attributesToUser';
import { useFormFields } from '../../../libs/hooksLib';
import { onError } from '../../../libs/errorLib';

import styles from './UserForm.module.scss';

const UserForm = ({ removeModal, onUserAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const cognitoProvider = new AWS.CognitoIdentityServiceProvider();

    try {
      setIsLoading(true);

      const params = {
        MessageAction: 'SUPPRESS',
        Username: fields.email,
        UserAttributes: [
          {
            Name: 'given_name',
            Value: fields.firstName
          },
          {
            Name: 'family_name',
            Value: fields.lastName
          },
          {
            Name: 'email',
            Value: fields.email
          },
        ],
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
      };

      const user = (await cognitoProvider.adminCreateUser(params).promise()).User;

      await cognitoProvider.adminSetUserPassword({
        Password: fields.password,
        Permanent: true,
        Username: fields.email,
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
      }).promise();

      onUserAdd(attributesToUser(user.Attributes));
      setIsLoading(false);
    } catch (e) {
      await cognitoProvider.adminDeleteUser({
        Username: fields.email,
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
      }).promise();

      onError(e);
    }

    removeModal();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles['form-row']}>
        <TextField
          id="firstName"
          label="User First Name"
          style={{ margin: 8 }}
          placeholder="First Name"
          type="text"
          margin="normal"
          value={fields.firstName}
          required
          onChange={handleFieldChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <div className={styles['form-row']}>
        <TextField
          id="lastName"
          label="User Last Name"
          style={{ margin: 8 }}
          placeholder="Last Name"
          type="text"
          margin="normal"
          value={fields.lastName}
          required
          onChange={handleFieldChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <div className={styles['form-row']}>
        <TextField
          id="email"
          label="User Email"
          style={{ margin: 8 }}
          placeholder="Email"
          type="email"
          margin="normal"
          value={fields.email}
          onChange={handleFieldChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <div className={styles['form-row']}>
        <TextField
          id="password"
          label="User Password"
          style={{ margin: 8 }}
          placeholder="Password"
          margin="normal"
          type="text"
          value={fields.password}
          onChange={handleFieldChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
      <div className={styles['form-row']}>
        <LoaderButton
          variant="contained"
          color="primary"
          className={styles.submitBtn}
          isLoading={isLoading}
          type="submit"
        >
          Create User
        </LoaderButton>
      </div>
    </form>
  );
};

export default UserForm;
