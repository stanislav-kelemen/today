import { Auth } from 'aws-amplify';
import {
  useContext, useEffect, useState, createContext
} from 'react';

const AuthenticationContext = createContext({});

export function useAuthenticationContext() {
  return useContext(AuthenticationContext);
}

export default function AuthenticationProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        await Auth.currentSession();

        setIsAuthenticated(true);
      } catch (e) {
        setIsAuthenticated(false);
      }
    };

    fetch();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
