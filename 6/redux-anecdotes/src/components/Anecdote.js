import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return <li>
    {anecdote.content} <br/>
    has {anecdote.votes}
    <button onClick={handleClick}>vote</button>
  </li>
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  // Sort Anecdotes
  anecdotes.sort((a, b) => b.votes - a.votes)

  return(
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => 
              dispatch(addVote(anecdote.id))}
          />)}
      </ul>
    </div>
  )
}

export default Anecdotes