import { useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const Logout = () => {
  const [token, setToken] = useOutletContext();
  const navigate = useNavigate();
  const client = useApolloClient();

  useEffect(() => {
    setToken(null);
    client.resetStore();
    navigate('/');
  }, [navigate, setToken, client]);

  return <div></div>;
};

export default Logout;
