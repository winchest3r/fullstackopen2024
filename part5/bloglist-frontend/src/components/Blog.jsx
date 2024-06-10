import { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateList, remove }) => {
  const [full, setFull] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  };

  const toggleView = () => setFull(!full);

  const shortView = () => {
    return (
      <>
        {blog.title} - {blog.author}
        <button onClick={toggleView}>view</button>
      </>
    );
  };

  const handleLikes = async () => {
    const blogToUpdate = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id
    };
    await blogService.update(blogToUpdate);
    setLikes(likes + 1);
    updateList();
  };

  const handleRemove = async () => {
    if (window.confirm('Remove blog ' + blog.title)) {
      await blogService.remove(blog);
      updateList();
    }
  };

  const fullView = () => {
    return (
      <>
        {blog.title} - {blog.author}
        <button onClick={toggleView}>hide</button><br />
        <a href={blog.url}>{blog.url}</a><br />
                likes {likes}
        <button onClick={handleLikes}>like</button><br />
        {blog.user.name}<br />
        {remove ? <button onClick={handleRemove}>remove</button> : ''}
      </>
    );
  };

  return (
    <div style={blogStyle}>
      {full ? fullView() : shortView()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  }),
  updateList: PropTypes.func.isRequired,
  remove: PropTypes.bool.isRequired,
};

export default Blog;