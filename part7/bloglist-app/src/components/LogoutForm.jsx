import { useSelector, useDispatch } from 'react-redux';
import blogService from '../services/blogs';

import { setLoggedUser } from '../slices/loggedUserSlice';
import { setNotification } from '../slices/notificationSlice';

const LogoutForm = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(({ loggedUser }) => loggedUser);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(setLoggedUser(null));
    blogService.setToken('');
    dispatch(setNotification('you are successfully logged out'));
  };

  if (!loggedUser) {
    return null;
  }

  return (
    <>
      {loggedUser.name} is logged in
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default LogoutForm;
