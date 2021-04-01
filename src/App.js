import { Route, Switch } from 'react-router-dom';
import dotenv from 'dotenv';
import { Amplify } from 'aws-amplify';

import ROUTES from './constants/routePaths';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';

import './App.scss';


dotenv.config();

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID
  }
});

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
        <Route exact path={ROUTES.LOGIN}>
          <Login />
        </Route>
        <Route exact path={ROUTES.SIGNUP}>
          <SignUp />
        </Route>
      </Switch>
    </>
  );
}

export default App;
