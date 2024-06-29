import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Links from '../components/Links';
import LoginForm from '../components/LoginForm';

const Root = () => {
  const [token, setToken] = useState(null);

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
