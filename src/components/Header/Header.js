import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import ROUTES from '../../constants/routePaths';
import { onError } from '../../libs/errorLib';
import { useAuthenticationContext } from '../../shared/Authentication';

import styles from './Header.module.scss';

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useAuthenticationContext();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (isAuthenticated) {
          const userInfo = await Auth.currentAuthenticatedUser();

          const accessTokenPayload = userInfo.signInUserSession.getAccessToken()?.payload;

          setIsAdmin(accessTokenPayload['cognito:groups']?.includes('admin'));
          setEmail(userInfo.attributes.email);
        }
      } catch (e) {
        onError(e)
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
            <div className={styles.email}>{email}</div>
            {isAdmin &&
              <>
                <Link className={styles.link} to={ROUTES.USERS}>
                  <span>Manage users</span>
                </Link>
                <Link className={styles.link} to={ROUTES.POSTS}>
                  <span>All posts</span>
                </Link>
              </>
            }
            <Link className = {styles.link} to={ROUTES.MY_POSTS}>
              <span>My Posts</span>
            </Link>
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
