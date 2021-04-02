import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

import { useAuthenticationContext } from '../../shared/Authentication';
import PostsPage from '../PostsPage';
import { onError } from '../../libs/errorLib';

import AdminContainer from '../AdminPanel/AdminContainer';

import styles from './Home.module.scss';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { isAuthenticated } = useAuthenticationContext();

  useEffect(() => {

    const fetch = async () => {
      if (isAuthenticated) {
        try {
          const session = await Auth.currentSession();
          const accessTokenPayload = session.getAccessToken()?.payload;
    
          setIsAdmin(accessTokenPayload['cognito:groups']?.includes('admin'));
        } catch (e) {
          onError(e);
        }
      } else {
        setIsAdmin(false);
      }
    };

    fetch();

  }, [isAuthenticated]);
  
  return (
    <main className={styles.main}>
      {isAuthenticated && (
        <>
          {isAdmin && <AdminContainer className={styles.adminPanel} />}
        </>
      )}
      {!isAdmin && <PostsPage />}
    </main>
  );
};

export default Home;
