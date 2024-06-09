import { useState, useEffect } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';

const App = () => {
  const [ user, setUser ] = useState(null);
  const [ blogs, setBlogs ] = useState([]);

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ url, setUrl ] = useState('');

  const [ info, setInfo ] = useState({ message: null });

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifyMessage = (message, type='info') => {
    setInfo({ message, type });
    setTimeout(() => setInfo({ message: null }), 3000);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      notifyMessage(`welcome, ${user.name}`);
    } catch (exception) {
      notifyMessage(exception.response.data.error, 'error');
    }

    setUsername('');
    setPassword('');
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    blogService.setToken('');
    notifyMessage('you are successfully logged out')
  }

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.add({ title, author, url });
      setBlogs(blogs.concat(newBlog));

      notifyMessage(`a new blog ${newBlog.title} added`);

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      notifyMessage(exception.response.data.error, 'error');
    }
  }

  if (user === null) {
    return (
      <>
        <Notification info={info}/>
        <h2>Log into Bloglist</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
              type="text" 
              value={username} 
              name="Username" 
              onChange={event => setUsername(event.target.value)}
            />
          </div>
          <div>
            password
            <input 
              type="password"
              value={password}
              name="Password"
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  } else {
    return (
      <>
        <Notification info={info}/>
        <h2>Bloglist</h2>
        <p>{user.name} is logged in</p>
        <button onClick={handleLogout}>logout</button>
        <ul>
          {blogs.map(b => <li key={b.id}><Blog blog={b} /></li>)}
        </ul>
        <h2>create new</h2>
        <NewBlogForm 
          addBlog={addBlog}
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
        />
      </>
    );
  }
};

export default App;