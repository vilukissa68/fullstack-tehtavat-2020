import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setTotal] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  let mostVotes = votes.indexOf(Math.max(...votes))
  
  const getAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length - 1))
  }

  const vote = () => {
    const points = [...votes]
    points[selected] += 1
    setTotal(points)
  }

  console.log("Most votes:", mostVotes)
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        
      </div>
      <div>
      <Button handleClick={getAnecdote} text='next anecdote'/>
      <Button handleClick={vote} text = 'vote'/>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{props.anecdotes[mostVotes]}</p>
        <p>has {votes[mostVotes]} votes</p>
        

      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)