import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'



const Anecdote = ({ anecdote, handleClick }) => {
  return <li>
    {anecdote.content} <br/>
    has {anecdote.votes}
    <button onClick={handleClick}>vote</button>
  </li>
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === ''){
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
    
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
            handleClick={() => {
              dispatch(addVote(anecdote.id))
              dispatch(setNotification(`You upvoted '${anecdote.content}'`))
              setTimeout(() => {dispatch(removeNotification())}, 5000)
            }}
          />)}
      </ul>
    </div>
  )
}

export default Anecdotes