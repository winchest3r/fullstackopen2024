import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';
import Filter from './components/Filter';

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <p><Filter /></p>
      <Anecdotes />
      <NewAnecdote />
    </>
  );
};

export default App;