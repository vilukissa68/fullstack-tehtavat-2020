import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteSercive from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log(event)
    const content = event.target.anecdote.value
    event.target.anecdote.value=''
    const newAnecdote = await anecdoteSercive.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`New note added`))
    setTimeout(() => {dispatch(removeNotification())}, 5000)

  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm