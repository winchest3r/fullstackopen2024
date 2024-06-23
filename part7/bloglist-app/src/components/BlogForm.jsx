import { createBlog } from '../slices/blogsSlice';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();

    toggleVisibility();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';

    const blogObject = { title, author, url };
    dispatch(createBlog(blogObject));
  };

  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <input name="title" placeholder="title" />
        </div>
        <div>
          <input name="author" placeholder="author" />
        </div>
        <div>
          <input name="url" placeholder="url" />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func,
};

export default BlogForm;
