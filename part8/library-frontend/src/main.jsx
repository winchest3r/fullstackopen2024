import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Root from './routes/root';
import ErrorPage from './components/ErrorPage';
import Authors from './components/Authors';
import Books from './components/Books';
import AddBookForm from './components/AddBookForm';

const graphqlUri = 'http://localhost:4000';

const client = new ApolloClient({
  uri: graphqlUri,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'authors',
        element: <Authors />,
      },
      {
        path: 'books',
        element: <Books />,
      },
      {
        path: 'addbook',
        element: <AddBookForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
