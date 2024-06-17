import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <p><Filter /></p>
      <Anecdotes />
      <NewAnecdote />
    </>
  );
};

export default App;