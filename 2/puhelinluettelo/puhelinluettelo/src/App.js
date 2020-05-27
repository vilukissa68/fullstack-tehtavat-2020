
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowContacts from './components/Contacts'
import contactService from './services/contact'
import contact from './services/contact'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ showAll, setShowAll] = useState(true)
  const [ filterString, setFilterString] = useState('')

const hook = () => {
  contactService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
}

useEffect(hook, [])

const addContact = (event) => {
  event.preventDefault()
  const contactObject = {
    name: newName,
    number: newNumber,
    id: persons[persons.length -1].id + 1,
  }

  const it = persons.find(element => element.name === newName)

  if(typeof it !== 'undefined'){
    const results = window.confirm(`${newName} is already added to the phonebook, 
    replace the old number with a new one?`)
    if( results === true ){
      updateContact(it.id, contactObject)
    }
    else{
      setNewName('')
      setNewNumber('')
    }
  }

  else{
      contactService
        .create(contactObject)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setNewName('')
            setNewNumber('')
          })
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

const updateContact = (id, newObject) => {
  console.log(newObject)
  console.log("id:", id)
  contactService
    .update(id, newObject).then(returnedContact => {
      setPersons(persons.map(p => p.id !== id ? p : returnedContact))
    })
}

const handleDeleteClick = (event) => {
  const removeID = parseInt(event.target.id)
  const result = window.confirm(`Delete ${persons.find(p => p.id === removeID).name} ?`)
  if( result === true ){
    contactService
      .remove(removeID)
        .then((response) => {
          setPersons(persons.filter(p => p.id !== removeID))
        })
  }
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
      <ShowContacts persons={contactsToShow} handleDeleteClick={handleDeleteClick}/>
    </div>
  )
}

export default App