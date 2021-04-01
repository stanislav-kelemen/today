import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

import { useAuthenticationContext } from '../../shared/Authentication';

import styles from './Home.module.scss';

const Home = () => {
  const [name, setName] = useState('');
  const { isAuthenticated } = useAuthenticationContext();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (isAuthenticated) {
          const userInfo = await Auth.currentAuthenticatedUser();

          const firstName = userInfo.attributes.given_name;
          const lastName = userInfo.attributes.family_name;

          setName(`${firstName} ${lastName}`);
        }
      } catch (e) { }
    }

    fetch();
  }, [isAuthenticated]);

  return (
    <main className={styles.mainText}>
      {isAuthenticated ? (
        `Hello, ${name}!`
      ) : (
        'Who are you?'
      )}
    </main>
  );
};

export default Home;
