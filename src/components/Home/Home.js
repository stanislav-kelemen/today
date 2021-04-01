import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

import { useAuthenticationContext } from '../../shared/Authentication';
import PostsPage from '../PostsPage';
import { onError } from '../../libs/errorLib';

import AdminContainer from '../AdminPanel/AdminContainer';

import styles from './Home.module.scss';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState('');
  const { isAuthenticated } = useAuthenticationContext();

  useEffect(() => {
    const fetch = async () => {
      if (isAuthenticated) {
        try {
          const session = await Auth.currentSession();
          const idTokenPayload = session.getIdToken().payload;
          const accessTokenPayload = session.getAccessToken().payload;
    
          setIsAdmin(accessTokenPayload['cognito:groups']?.includes('admin'));
          setName(`${idTokenPayload.given_name} ${idTokenPayload.family_name}`);
        } catch (e) {
          onError(e);
        }
      }
    };

    fetch();
  }, [isAuthenticated]);

  const renderAdminPanel = () => {
    return isAdmin && (
      <AdminContainer className={styles.adminPanel}/>
    );
  };
  
  return (
    <main className={styles.main}>
      {isAuthenticated && (
        <>
          <div className={styles.hello}>{!isAdmin && `Hello, ${name}!`}</div>
          {renderAdminPanel()}
        </>
      )}
    <div>
      <PostsPage />
    </div>
    </main>
  );
};

export default Home;
