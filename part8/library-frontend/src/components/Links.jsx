import { Link } from 'react-router-dom';

const Links = ({ token }) => {
  return (
    <div>
      <Link to="/authors">authors</Link> / <Link to="/books">books</Link>
      {token ? ' / ' : ''}
      {token ? <Link to="/recommend">recommend</Link> : ''}
      {token ? ' / ' : ''}
      {token ? <Link to="/addbook">add book</Link> : ''}
      {token ? ' / ' : ''}
      {token ? <Link to="/logout">logout</Link> : ''}
    </div>
  );
};

export default Links;
