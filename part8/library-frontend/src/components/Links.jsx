import { Link } from 'react-router-dom';

const Links = () => {
  return (
    <div>
      <Link to="/authors">authors</Link> / <Link to="/books">books</Link> /{' '}
      <Link to="/addbook">add book</Link>
    </div>
  );
};

export default Links;
