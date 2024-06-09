import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';

const App = () => {
  const [ blogs, setBlogs ] = useState([]);

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs));
  }, []);

  return (
    <>
      <h1>Bloglist</h1>
      <ul>
        {blogs.map(b => <li key={b.id}><Blog blog={b} /></li>)}
      </ul>
    </>
  );
};

export default App;