import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const AuthorsTable = ({ authors }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>name</th>
          <th>born</th>
          <th>books</th>
        </tr>
        {authors.map((a) => (
          <tr key={a.id}>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SetBirthYearForm = () => {
  const [born, setBorn] = useState('');
  const [name, setName] = useState('');

  const result = useQuery(ALL_AUTHORS);

  const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const numberBorn = Number(born);

    changeBirthYear({ variables: { name, year: numberBorn } });

    setBorn('');
  };

  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setName(e.target.value)}>
          {result.data.allAuthors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          <input
            placeholder="born"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <AuthorsTable authors={result.data.allAuthors} />
      <SetBirthYearForm />
    </div>
  );
};

export default Authors;
