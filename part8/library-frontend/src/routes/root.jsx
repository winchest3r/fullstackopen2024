import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Links from '../components/Links';
import LoginForm from '../components/LoginForm';
import { useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../queries';

const Root = () => {
  const [token, setToken] = useState(null);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;

      window.alert(`Book '${addedBook.title}' was added.`);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

  return (
    <div>
      <Links token={token} />
      <div>
        {token ? (
          <Outlet context={[token, setToken]} />
        ) : (
          <LoginForm setToken={setToken} />
        )}
      </div>
    </div>
  );
};

export default Root;
