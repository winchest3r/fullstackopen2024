import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import userService from '../services/users';

import { setNotification } from '../slices/notificationSlice';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService
      .users()
      .then((data) => setUsers(data))
      .catch((exception) => setNotification(exception.response.data.error));
  }, []);

  return (
    <>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Users;
