import React from 'react'

const ShowContacts = (props) => {
    return(
      <ul>
      {props.persons.map((person, i) =>
        <p key={i}>{person.name} {person.number} <button id={person.id} onClick={props.handleDeleteClick}>delete</button></p>
      )}
      </ul>
    )
  }

export default ShowContacts