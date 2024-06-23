import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { initializeBlogs, likeBlog, removeBlog } from '../slices/blogsSlice';

import Togglable from './Togglable';
import Blog from './Blog';
import BlogForm from './BlogForm';

const Bloglist = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(({ blogs }) =>
    blogs.toSorted((a, b) => b.likes - a.likes)
  );

  const loggedUser = useSelector(({ loggedUser }) => loggedUser);

  const bloglistRef = useRef();

  const handleBlogFormVisibility = () => {
    bloglistRef.current.toggleVisibility();
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLikes = (blog) => () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = (blog) => () => {
    if (window.confirm('Remove blog ' + blog.title)) {
      dispatch(removeBlog(blog));
    }
  };

  return (
    <>
      {blogs.map((b) => (
        <Blog
          key={b.id}
          blog={b}
          update={handleLikes(b)}
          canRemove={b.user.username === loggedUser.username}
          remove={handleRemove(b)}
        />
      ))}
      <Togglable buttonLabel={'new blog'} ref={bloglistRef}>
        <BlogForm toggleVisibility={handleBlogFormVisibility} />
      </Togglable>
    </>
  );
};

export default Bloglist;
