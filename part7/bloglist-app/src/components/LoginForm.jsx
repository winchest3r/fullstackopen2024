import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLoggedUser } from '../slices/loggedUserSlice';
import { setNotification } from '../slices/notificationSlice';

import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    event.target.username.value = '';
    event.target.password.value = '';

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      dispatch(setLoggedUser(user));
      blogService.setToken(user.token);
      dispatch(setNotification(`welcome, ${user.name}`));
      navigate('/');
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error'));
    }
  };

  return (
    <>
      <h2>Log into Bloglist</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="username"
            name="username"
            data-testid="username"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            data-testid="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
