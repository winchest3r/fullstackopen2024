import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLoggedUser } from './slices/loggedUserSlice';

import blogService from './services/blogs';

import Notification from './components/Notification';
import Bloglist from './components/Bloglist';
import LoginForm from './components/LoginForm';

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(({ loggedUser }) => loggedUser);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setLoggedUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  return (
    <>
      <Notification />
      <LoginForm />
      {loggedUser === null ? '' : <Bloglist />}
    </>
  );
};

export default App;
