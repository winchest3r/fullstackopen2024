import { useState, useEffect } from 'react'
import personService from './services/persons'

/** Function to handle all input hooks */
const handleInput = (setValue) => (event) => setValue(event.target.value)

const Filter = ({ value, onChange }) => <>filter shown with <input value={value} onChange={handleInput(onChange)}/></>

const Person = ({ name, number, handleRemove }) => {
  return (
    <>
      <p>{name} {number} <button onClick={handleRemove}>delete</button></p>
    </>
  )
}

const Persons = ({ persons, filter, handleRemove }) => {
  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {personsToShow.map(p => 
        <Person 
          key={p.id} 
          name={p.name} 
          number={p.number} 
          handleRemove={handleRemove(p)} />)}
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
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(serverPersons => setPersons(serverPersons))
  }

  useEffect(hook, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert('Add a name to the input form')
    } else if (newNumber === '') {
      alert('Add a phone number to the input form')
    } else if (persons.find(p => p.name === newName && p.number === newNumber) != undefined) {
      alert(`${newName} with number ${newNumber} is already exists`)
    } else if (persons.find(p => p.name === newName) != undefined) {
      const p = persons.find(p => p.name === newName)
      if (confirm(`${p.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(p.id, { ...p, number: newNumber })
          .then((alterPerson) => setPersons(persons.map(p => p.id === alterPerson.id ? alterPerson : p)))
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleRemove = (person) => () => {
    if (confirm(`Delete ${person.name} with number ${person.number}?`)) {
      personService
        .remove(person.id)
        .then((removedPerson) => {
          setPersons(persons.filter(p => p.id !== removedPerson.id))
        })
    }
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter value={filterText} onChange={setFilterText} />
      <h2>add a new</h2>
      <PersonForm submit={handleSubmit} name={newName} setName={setNewName} number={newNumber} setNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterText} handleRemove={handleRemove} />
    </>
  )
}

export default App