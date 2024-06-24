import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { initializeBlogs } from '../slices/blogsSlice';

import Togglable from './Togglable';
import Blog from './Blog';
import BlogForm from './BlogForm';

const Bloglist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector(({ blogs }) =>
    blogs.toSorted((a, b) => b.likes - a.likes)
  );

  const bloglistRef = useRef();

  const handleBlogFormVisibility = () => {
    bloglistRef.current.toggleVisibility();
  };

  return (
    <>
      {blogs.map((b) => (
        <Blog key={b.id} blog={b} />
      ))}
      <Togglable buttonLabel={'new blog'} ref={bloglistRef}>
        <BlogForm toggleVisibility={handleBlogFormVisibility} />
      </Togglable>
    </>
  );
};

export default Bloglist;
