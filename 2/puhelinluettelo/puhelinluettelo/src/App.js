
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowContacts from './components/Contacts'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll] = useState(true)
  const [ filterString, setFilterString] = useState('')

const hook = () => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log("Contacts loaded from server")
      setPersons(response.data)
    })
}

useEffect(hook, [])

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
  setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter string={filterString} handleChange={filterContacts}/>
      </div>
      <h2>Add a new</h2>
        <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <ShowContacts persons={contactsToShow}/>
    </div>
  )
}

export default App