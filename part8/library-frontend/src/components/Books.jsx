import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';
import BooksTable from './BooksTable';

const BooksFilterSelector = ({ genres, setFilterGenre }) => {
  return (
    <div>
      <select
        defaultValue="all genres"
        onChange={(e) => setFilterGenre(e.target.value)}
      >
        <option value="all genres">all genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

const Books = () => {
  const [filterGenre, setFilterGenre] = useState('all genres');

  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const genres = [
    ...new Set(
      result.data.allBooks
        .map((b) => b.genres)
        .flat()
        .map((g) => g.name)
    ),
  ];

  const filteredBooks = result.data.allBooks.filter((book) => {
    if (!filterGenre || filterGenre === 'all genres') {
      return true;
    }
    for (const { name } of book.genres) {
      if (name === filterGenre) {
        return true;
      }
    }
    return false;
  });

  return (
    <div>
      <h2>books</h2>
      <BooksTable books={filteredBooks} />
      <BooksFilterSelector genres={genres} setFilterGenre={setFilterGenre} />
    </div>
  );
};

export default Books;
