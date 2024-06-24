import { useDispatch, useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

import { addComment } from '../slices/blogsSlice';

const Comments = () => {
  const dispatch = useDispatch();
  const id = useMatch('/blogs/:id').params.id;

  const blog = useSelector(({ blogs }) => blogs.filter((b) => b.id === id)[0]);

  const handleNewComment = (event) => {
    event.preventDefault();

    const content = event.target.comment.value;
    event.target.comment.value = '';

    dispatch(addComment(blog, content));
  };

  return (
    <>
      <h3>comments</h3>
      <form onSubmit={handleNewComment}>
        <input
          name="comment"
          placeholder={
            blog.comments.length === 0 ? 'be first!' : 'write something here...'
          }
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
