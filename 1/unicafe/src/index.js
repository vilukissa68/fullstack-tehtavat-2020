import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return(
    <>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}{props.text2}</td>
    </tr>
    </>
  )
}

const Statistics = (props) => { 

const getAverage = (good, bad, total) => {
  return (good + -1*bad)/total
}

const getPositive = (good, total) => {
  return good/total*100
}

if (props.total === 0){
  return (
    <>
    <p>No feedback given</p>
    </>
  )
}

return(
  <>
  <h1>Statistics</h1>
  <table>
    <tbody>
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text='neutral' value={props.neutral}/>
      <StatisticLine text='bad' value={props.bad}/>
      <StatisticLine text='all' value={props.total}/>
      <StatisticLine text='average' value={getAverage(props.good, props.bad, props.total)}/>
      <StatisticLine text='positive' value={getPositive(props.good, props.total)} text2='%'/>
    </tbody>
  </table>
  </>
)
}

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

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={goodClickHandler} text='good' />
      <Button handleClick={neutralClickHandler} text='neutral' />
      <Button handleClick={badClickHanlder} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
