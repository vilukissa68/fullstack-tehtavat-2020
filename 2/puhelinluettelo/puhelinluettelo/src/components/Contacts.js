import React from 'react'

const ShowContacts = (props) => {
    return(
      <ul>
      {props.persons.map((person, i) =>
        <p key={i}>{person.name} {person.number} <button onClick={(e) => props.handleDeleteClick(e, person.id)}>delete</button></p>
      )}
      </ul>
    )
  }

export default ShowContacts