import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_BOOK, ALL_AUTHORS, ALL_GENRES } from '../queries';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');

  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      console.log(messages);
    },
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_GENRES }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const intPublished = Number(published);

    createBook({
      variables: {
        title,
        author,
        published: intPublished,
        genres,
      },
    });

    setTitle('');
    setAuthor('');
    setPublished('');
    setGenre('');
    setGenres([]);
  };

  const handleGenres = (event) => {
    event.preventDefault();

    if (genre) {
      setGenres(genres.concat(genre));
      setGenre('');
    }
  };

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="published"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <button onClick={handleGenres}>add genre</button>
        </div>
        <div>genres: {genres.join(', ') || 'none'}</div>
        <button type="submit">add book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
