import React from 'react'

const ShowContacts = (props) => {
    return(
      <ul>
      {props.persons.map((person, i) =>
        <p key={i}>{person.name} {person.number}</p>
      )}
      </ul>
    )
  }

export default ShowContacts