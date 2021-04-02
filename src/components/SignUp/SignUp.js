import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory, Link } from 'react-router-dom';

import ROUTES from '../../constants/routePaths';
import LoaderButton from '../../shared/LoaderButton';
import { useFormFields } from '../../libs/hooksLib';
import { onError } from '../../libs/errorLib';

import style from './SignUp.module.scss';

const SignUp = () => {
  const [fields, handleFieldChange] = useFormFields({
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: ''
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => (
    fields.email.length > 0
    && fields.password.length > 0
    && fields.birthday.length > 0
    && fields.lastName.length > 0
    && fields.firstName.length > 0
    && fields.password === fields.confirmPassword
  );

  const validateConfirmationForm = () => (
    fields.confirmationCode.length > 0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const createdUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
        attributes: {
          'given_name': fields.firstName,
          'family_name': fields.lastName,
          'birthdate': fields.birthday
        }
      });

      setNewUser(createdUser);
    } catch (e) {
      onError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);

      history.push(ROUTES.LOGIN);
    } catch (e) {
      onError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderConfirmationForm = () => (
    <form className={style.confirmationForm} onSubmit={handleConfirmationSubmit}>
      <label className={style.confirmationLabel} htmlFor="confirmationCode">
        Confirmation Code
      </label>
      <input
        className={style.confirmationCodeField}
        id="confirmationCode"
        type="tel"
        placeholder="6-digit number"
        value={fields.confirmationCode}
        onChange={handleFieldChange}
      />
      <label className={style.confirmationHint}>Please check your email for the code.</label>
      <LoaderButton
        className={style.confirmationSubmitBtn}
        type="submit"
        isLoading={isLoading}
        disabled={!validateConfirmationForm()}
      >
        Verify
      </LoaderButton>
    </form>
  );

  const renderForm = () => (
    <div className={style.signUp}>
      <h2 className={style.heading}>Sign Up</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label} htmlFor="firstName">
          First Name
        </label>
        <input
          className={style.field}
          id="firstName"
          type="text"
          placeholder="First Name"
          value={fields.firstName}
          onChange={handleFieldChange}
        />
        <label className={style.label} htmlFor="lastName">
          Last Name
        </label>
        <input
          className={style.field}
          id="lastName"
          type="text"
          placeholder="Last Name"
          value={fields.lastName}
          onChange={handleFieldChange}
        />
        <label className={style.label} htmlFor="birthday">
          Birthday
        </label>
        <input
          className={style.field}
          id="birthday"
          type="date"
          value={fields.birthday}
          onChange={handleFieldChange}
        />
        <label className={style.label} htmlFor="email">
          Email
        </label>
        <input
          className={style.field}
          id="email"
          type="email"
          placeholder="Email"
          value={fields.email}
          onChange={handleFieldChange}
        />
        <label className={style.label} htmlFor="password">
          Password
        </label>
        <input
          className={style.field}
          id="password"
          type="password"
          placeholder="Password"
          value={fields.password}
          onChange={handleFieldChange}
          required
        />
        <label className={style.label} htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className={style.field}
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={fields.confirmPassword}
          onChange={handleFieldChange}
          required
        />
        <LoaderButton
          type="submit"
          variant="contained"
          color="secondary"
          className={style.submitBtn}
          isLoading={isLoading}
          disabled={!validateForm()}
          onClick={renderConfirmationForm}
        >
          Signup
        </LoaderButton>
      </form>
      <div className={style.haveAccount}>
        <p>Already have an account?</p>
        <Link
          className={style.loginLink}
          to={ROUTES.LOGIN}
        >
          Log in
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </>
  );
};

export default SignUp;
