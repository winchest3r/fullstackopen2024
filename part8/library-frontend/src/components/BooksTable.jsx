const BooksTable = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((b) => (
          <tr key={b.id}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
