  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTH } from '../queries'
import Select from 'react-select'

const SelectBar = (props) => {


  const data = props.authors.map(a => ({label: a.name, value: a.name}))
  const setName = props.setName

  const handleChange = selection => {
    setName(selection.value)
  }

  return(
    <Select options={data}
    onChange={handleChange}/> 
  )
}



const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  
  const [ setBirth ] = useMutation(SET_BIRTH, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  const submit = async (event) => {
    event.preventDefault()

    console.log("Editing author...")

    setBirth({ variables: { name, born }})

    setName('')
    setBorn('')
  }
  
  if (!props.show) {
    return null
  }

  if (result.loading){
    return(
      <div>loading...</div>
    )
  }
  
  const authors = result.data.allAuthors


  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
            <SelectBar authors={authors} setName={setName}/>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(parseInt(target.value))}
              />
            </div>
            <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
