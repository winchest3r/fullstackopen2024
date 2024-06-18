import { useEffect } from 'react';
import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';
import Filter from './components/Filter';
import Notification from './components/Notification';
import anecdoteService from './services/anecdotes';
import { useDispatch } from 'react-redux';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => {
      dispatch(setAnecdotes(anecdotes))
    });
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