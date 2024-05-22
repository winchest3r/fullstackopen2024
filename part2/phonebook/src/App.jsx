import { useState } from 'react'

/** Function to handle all input hooks */
const handleInput = (setValue) => (event) => setValue(event.target.value)

const Filter = ({ value, onChange }) => <>filter shown with <input value={value} onChange={handleInput(onChange)}/></>

const Persons = ({ persons, filter }) => {
  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {personsToShow.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </>
  )
}

const PersonForm = ({ submit, name, setName, number, setNumber }) => {
  return (
    <>
      <form onSubmit={submit}>
        name: <input value={name} onChange={handleInput(setName)} /><br />
        number: <input value={number} onChange={handleInput(setNumber)} /><br />
        <button type="submit">add</button><br />
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert('Add a name to the input form')
    } else if (newNumber === '') {
      alert('Add a phone number to the input form')
    } else if (persons.find(p => p.name === newName && p.phone === newNumber) != undefined) {
      alert(`${newName} with number ${newNumber} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter value={filterText} onChange={setFilterText} />
      <h2>add a new</h2>
      <PersonForm submit={handleSubmit} name={newName} setName={setNewName} number={newNumber} setNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterText} />
    </>
  )
}

export default App