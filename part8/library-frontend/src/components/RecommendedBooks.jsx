import { useQuery } from '@apollo/client';

import { ALL_BOOKS, CURRENT_USER } from '../queries';
import BooksTable from './BooksTable';

const RecommendedBooks = () => {
  const userResult = useQuery(CURRENT_USER);
  const booksResult = useQuery(ALL_BOOKS);

  if (userResult.loading) {
    return <div>loading...</div>;
  }

  const favoriteGenre = userResult.data.me.favoriteGenre;

  const books = booksResult.data.allBooks.filter((book) => {
    for (const { name } of book.genres) {
      if (name === favoriteGenre) {
        return true;
      }
    }
    return false;
  });

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <BooksTable books={books} />
    </div>
  );
};

export default RecommendedBooks;
