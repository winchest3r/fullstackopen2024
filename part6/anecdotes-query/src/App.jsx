import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from './requests';

import AnecdoteForm from './components/AnecdoteForm';
import Anecdotes from './components/Anecdotes';
import Notification from './components/Notification';

import { NotificationContextProvider } from './components/NotificationContext';

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (result.isError) {
    return <>anecdote service not available due to problems in server</>;
  }

  if (result.isLoading) {
    return <>Loading, please wait...</>;
  }

  const anecdotes = result.data.toSorted((a, b) => b.votes - a.votes);

  return (
    <NotificationContextProvider>
      <h2>Anecdote app</h2>
      <Notification />
      <AnecdoteForm />
      <Anecdotes anecdotes={anecdotes} />
    </NotificationContextProvider>
  );
};

export default App;