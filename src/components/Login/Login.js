import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory, Link } from 'react-router-dom';

import LoaderButton from '../../shared/LoaderButton';

import ROUTES from '../../constants/routePaths';
import { useAuthenticationContext } from '../../shared/Authentication';

import { useFormFields } from '../../libs/hooksLib';
import { onError } from '../../libs/errorLib';

import styles from './Login.module.scss';

const Login = () => {
  const history = useHistory();
  const { setIsAuthenticated } = useAuthenticationContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: ''
  });

  const validateForm = () => (
    fields.email.length > 0 && fields.password.length > 0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);

      history.push(ROUTES.HOME);
      setIsAuthenticated(true);
    } catch (e) {
      onError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <h2 className={styles.heading}>Welcome</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.field}
          id="email"
          type="email"
          placeholder="Email"
          value={fields.email}
          onChange={handleFieldChange}
        />
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.field}
          id="password"
          type="password"
          placeholder="Password"
          value={fields.password}
          onChange={handleFieldChange}
        />
        <LoaderButton
          className={styles.submitBtn}
          variant="contained"
          color="secondary"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
      <div className={styles.notRegistered}>
        <p>Not registered?</p>
        <Link
          className={styles.signUpLink}
          to={ROUTES.SIGNUP}
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Login;
