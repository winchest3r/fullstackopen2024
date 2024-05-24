import { useState, useEffect } from 'react'
import personService from './services/persons'

/** Function to handle all input hooks */
const handleInput = (setValue) => (event) => setValue(event.target.value)

const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }
  const noteStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (type === 'error') {
    noteStyle.color = 'red'
  }
  return (
    <div style={noteStyle}>
      {message}
    </div>
  )
}

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
  const [noteType, setNoteType] = useState('note')
  const [noteMessage, setNoteMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(serverPersons => setPersons(serverPersons))
  }

  useEffect(hook, [])

  const sendMessage = (type, message) => {
    setNoteType(type)
    setNoteMessage(message)
    setTimeout(() => {
      setNoteMessage(null)
    }, 2000)
  }

  const clearPersonFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert('Add a name to the input form')
    } else if (newNumber === '') {
      alert('Add a phone number to the input form')
    } else if (persons.find(p => p.name === newName && p.number === newNumber) != undefined) {
      alert(`${newName} with number ${newNumber} is already exists`)
      clearPersonFields()
    } else if (persons.find(p => p.name === newName) != undefined) {
      const p = persons.find(p => p.name === newName)
      if (confirm(`${p.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(p.id, { ...p, number: newNumber })
          .then((alterPerson) => {
            setPersons(persons.map(p => p.id === alterPerson.id ? alterPerson : p))
            clearPersonFields()
            sendMessage('note', 'Replaced ' + p.name)
          })
          .catch((error) => {
            sendMessage('error', `Information of ${p.name} has already been removed from the server`)
          })
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
          clearPersonFields()
          sendMessage('note', 'Added ' + personObject.name)
      })
    }
  }

  const handleRemove = (person) => () => {
    if (confirm(`Delete ${person.name} with number ${person.number}?`)) {
      personService
        .remove(person.id)
        .then((removedPerson) => {
          setPersons(persons.filter(p => p.id !== removedPerson.id))
          sendMessage('note', person.name + 'has been deleted')
        })
        .catch((error) => {
          sendMessage('error', `Information of ${person.name} has already been removed from the server`)
        })
    }
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Notification type={noteType} message={noteMessage} />
      <Filter value={filterText} onChange={setFilterText} />
      <h2>add a new</h2>
      <PersonForm submit={handleSubmit} name={newName} setName={setNewName} number={newNumber} setNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterText} handleRemove={handleRemove} />
    </>
  )
}

export default App