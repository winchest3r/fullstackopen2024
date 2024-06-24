import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';

import userService from '../services/users';

const UserView = () => {
  const match = useMatch('/users/:id');
  const [user, setUser] = useState(null);

  useEffect(() => {
    userService
      .user(match.params.id)
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [match.params.id]);

  if (!user) {
    return <>cannot find a user</>;
  }

  return (
    <>
      <h2>{user.name}</h2>
      {user.blogs.length === 0 ? (
        <h3>no blogs</h3>
      ) : (
        <>
          <h3>added blogs</h3>
          <ul>
            {user.blogs.map((b) => (
              <li key={b.id}>{b.title}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default UserView;
