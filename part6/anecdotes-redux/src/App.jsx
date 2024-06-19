import { useEffect } from 'react';
import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <>
      <h2>Anecdotes</h2>
      <p><Filter /></p>
      <Anecdotes />
      <NewAnecdote />
      <Notification />
    </>
  );
};

export default App;