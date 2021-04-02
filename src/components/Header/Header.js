import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import ROUTES from '../../constants/routePaths';
import { onError } from '../../libs/errorLib';
import { useAuthenticationContext } from '../../shared/Authentication';

import styles from './Header.module.scss';

const Header = () => {
  const [email, setEmail] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useAuthenticationContext();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (isAuthenticated) {
          const userInfo = await Auth.currentAuthenticatedUser();

          setEmail(userInfo.attributes.email);
        }
      } catch (e) {
        onError(e);
      }
    }

    fetch();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await Auth.signOut();

    setIsAuthenticated(false);
  };

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={ROUTES.HOME}>
        <h1>UserApp</h1>
      </Link>
      <div className={styles.links}>
        {isAuthenticated ? (
          <>
            <Link className={styles.link} to={ROUTES.MY_POSTS}>
              <span>My Posts</span>
            </Link>
            <div className={styles.email}>{email}</div>
            <Link className={styles.link} to={ROUTES.HOME} onClick={handleLogout}>
              <span>Log Out</span>
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.link} to={ROUTES.LOGIN}>
              Login
            </Link>
            <Link className={styles.link} to={ROUTES.SIGNUP}>
              SignUp
            </Link>
          </>
        )}
        
      </div>
    </header>
  );
};

export default Header;
