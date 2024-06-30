import { useQuery } from '@apollo/client';

import { ALL_BOOKS, CURRENT_USER } from '../queries';
import BooksTable from './BooksTable';

const InnerRecommendedBooks = ({ favoriteGenre }) => {
  const result = useQuery(ALL_BOOKS, { variables: { genre: favoriteGenre } });

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <BooksTable books={result.data.allBooks} />
    </div>
  );
};

const RecommendedBooks = () => {
  const userResult = useQuery(CURRENT_USER);

  if (userResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <InnerRecommendedBooks favoriteGenre={userResult.data.me.favoriteGenre} />
    </div>
  );
};

export default RecommendedBooks;
