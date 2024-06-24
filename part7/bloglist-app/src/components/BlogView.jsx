import { useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { initializeBlogs, likeBlog, removeBlog } from '../slices/blogsSlice';

import Comments from './Comments';

const BlogView = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(({ loggedUser }) => loggedUser);
  const blogs = useSelector(({ blogs }) => blogs);

  const id = useMatch('/blogs/:id').params.id;
  const blog = id ? blogs.find((b) => b.id === id) : null;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLikes = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    if (window.confirm('Remove blog ' + blog.title)) {
      dispatch(removeBlog(blog));
      navigate('/');
    }
  };

  if (!blog) {
    return <>cannot find a blog</>;
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={handleLikes}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {loggedUser.username !== blog.user.username ? (
        ''
      ) : (
        <button onClick={handleRemove}>remove</button>
      )}
      <Comments />
    </>
  );
};

export default BlogView;
