import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import Root from './routes/root';
import ErrorPage from './components/ErrorPage';
import Authors from './components/Authors';
import Books from './components/Books';
import AddBookForm from './components/AddBookForm';
import Logout from './components/Logout';
import RecommendedBooks from './components/RecommendedBooks';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000' }));

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
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
      {
        path: 'logout',
        element: <Logout />,
      },
      {
        path: 'recommend',
        element: <RecommendedBooks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
