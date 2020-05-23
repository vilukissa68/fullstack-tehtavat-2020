
import React, { useState } from 'react'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState()
  const [ showAll, setShowAll] = useState(true)
  const [ filterString, setFilterString] = useState('')



const addContact = (event) => {
  event.preventDefault()
  const contactObject = {
    name: newName,
    number: newNumber,
    id: persons.length + 1,
  }

  const it = persons.find(element => element.name === newName)
  if(typeof it !== 'undefined'){
    window.alert(`${newName} is already added to the phonebook`)
  }
  else{
  setPersons(persons.concat(contactObject))
  setNewName('')
  console.log("Contact added")
  }
}

const contactsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

const handleNameChange = (event) => {
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const filterContacts = (event) => {
  setShowAll(false)
  setFilterString(event.target.value)

}

const ShowContact = (props) => {
  return(
    <ul>
    {props.persons.map((person, i) =>
      <p key={i}>{person.name} {person.number}</p>
    )}
    </ul>
  )
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter/>
      <h2>Add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowContact persons={contactsToShow}/>
    </div>
  )

}

export default App