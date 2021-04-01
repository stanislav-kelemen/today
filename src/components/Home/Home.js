import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';

import { useAuthenticationContext } from '../../shared/Authentication';
import PostsPage from '../PostsPage';
import { onError } from '../../libs/errorLib';

import styles from './Home.module.scss';

const getUsers = () => {
  const params = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
	  AttributesToGet: [
      'given_name',
    ],
  };

  return new Promise((resolve, reject) => {
    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
    });

    var cognitoProvider = new AWS.CognitoIdentityServiceProvider();

    cognitoProvider.listUsers(params, (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    })
  });
}

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState('');
  const [userList, setUserList] = useState([]);
  const { isAuthenticated } = useAuthenticationContext();

  useEffect(() => {
    const fetch = async () => {
      if (isAuthenticated) {
        try {
          const session = await Auth.currentSession();
          const idTokenPayload = session.getIdToken().payload;
          const accessTokenPayload = session.getAccessToken().payload;

          setUserList(await getUsers());
    
          setIsAdmin(accessTokenPayload['cognito:groups']?.includes('admin'));
          setName(`${idTokenPayload.given_name} ${idTokenPayload.family_name}`);
        } catch (e) {
          onError(e);
        }
      }
    };

    fetch();
  }, [isAuthenticated]);
  
  return (
    <main className={styles.mainText}>
      {isAuthenticated ? (
        `Hello, ${name}!${isAdmin ? userList : ''}`
      ) : (
        'Who are you?'
      )}
    <div>
      <PostsPage />
    </div>
    </main>
  );
};

export default Home;
