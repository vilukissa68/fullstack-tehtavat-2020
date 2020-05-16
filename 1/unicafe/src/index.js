import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => (
  <p>{props.text} {props.value} {props.text2}</p>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const goodClickHandler = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const neutralClickHandler = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const badClickHanlder = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  const getAverage = () => {
    return (good + -1*bad)/total
  }

  const getPositive = () => {
    return good/total
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodClickHandler} text='good' />
      <Button handleClick={neutralClickHandler} text='neutral' />
      <Button handleClick={badClickHanlder} text='bad' />
      <h1>statistics</h1>
      <Display text='good' value={good}/>
      <Display text='neutral' value={neutral}/>
      <Display text='bad' value={bad}/>
      <Display text='all' value={total}/>
      <Display text='average' value={getAverage()}/>
      <Display text='positive' value={getPositive()} text2='%'/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)