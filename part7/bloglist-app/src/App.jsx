import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

import { setLoggedUser } from './slices/loggedUserSlice';

import blogService from './services/blogs';

import Notification from './components/Notification';
import Bloglist from './components/Bloglist';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import Users from './components/Users';
import UserView from './components/UserView';
import BlogView from './components/BlogView';

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

  const style = {
    padding: 5,
  };

  return (
    <>
      <div>
        <Link style={style} to="/">
          blogs
        </Link>
        <Link style={style} to="/users">
          users
        </Link>
        <LogoutForm style={style} />
      </div>
      <Notification />

      {loggedUser === null ? (
        <LoginForm />
      ) : (
        <Routes>
          <Route path="/" element={<Bloglist />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      )}
    </>
  );
};

export default App;
