import { Route, Switch } from 'react-router-dom';
import dotenv from 'dotenv';
import { Amplify } from 'aws-amplify';
import AWS from 'aws-sdk';

import ROUTES from './constants/routePaths';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Comments from './components/Comments';
import PostPage from './components/PostsPage';
import PostDetails from './components/PostsPage/PostItemDetails';
import MyPosts from './components/MyPosts';
import AdminContainer from './components/AdminPanel/AdminContainer';
import NotFound from './components/NotFound';

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

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
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
        <Route exact path={ROUTES.COMMENTS}>
          <Comments />
        </Route>
        <Route exact path={ROUTES.SIGNUP}>
          <SignUp />
        </Route>
        <Route path="/post/:postId">
          <PostDetails />
        </Route>
        <Route exact path={ROUTES.MY_POSTS}>
          <MyPosts />
        </Route>
        <Route exact path={ROUTES.POSTS}>
          <PostPage />
        </Route>
        <Route exact path={ROUTES.USERS}>
          <AdminContainer />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
