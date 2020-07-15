import React from 'react'
import Anecdotes from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {


  return (
    <div>
      <Notification/>
      <Filter/>
      <Anecdotes/>
      <AnecdoteForm/>
    </div>
  )
}

export default App