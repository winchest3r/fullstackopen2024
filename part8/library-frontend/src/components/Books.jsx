import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { ALL_BOOKS, ALL_GENRES } from '../queries';
import BooksTable from './BooksTable';

const BooksFilterSelector = ({ genres, currentGenre, handleOptions }) => {
  return (
    <div>
      <select defaultValue={currentGenre} onChange={handleOptions}>
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
  const [filterOptions, setFilterOptions] = useState({});

  const result = useQuery(ALL_BOOKS, filterOptions);

  const genresResult = useQuery(ALL_GENRES);

  if (result.loading || genresResult.loading) {
    return <div>loading...</div>;
  }

  const genres = genresResult.data.allGenres.map((g) => g.name);

  const handleFilterOptions = (event) => {
    if (event.target.value === 'all genres') {
      setFilterOptions({});
    } else {
      setFilterOptions({
        variables: {
          genre: event.target.value,
        },
      });
    }
  };

  return (
    <div>
      <h2>books</h2>
      <BooksTable books={result.data.allBooks} />
      <BooksFilterSelector
        genres={genres}
        currentGenre={
          filterOptions.variables ? filterOptions.variables.genre : 'all genres'
        }
        handleOptions={handleFilterOptions}
      />
    </div>
  );
};

export default Books;
