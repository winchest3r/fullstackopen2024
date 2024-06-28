import { Outlet } from 'react-router-dom';
import Links from '../components/Links';

const Root = () => {
  return (
    <div>
      <Links />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
