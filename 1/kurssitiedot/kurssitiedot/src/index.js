import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <h1> {props.name} </h1>
  )
}

const Part = (props) => {
  return ( 
  <>
  <p>{props.name} {props.count} </p>
  </>
  )
}

const Content = (props) => {
  return (
    <>
    <Part name = {props.part1} count = {props.exercises1}/>
    <Part name = {props.part2} count = {props.exercises2}/>
    <Part name = {props.part3} count = {props.exercises3}/>
    </>
  )
}

const Total = (props) => {
  return(
  <>
  <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
  </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name = {course}/>
      <Content part1 = {part1} exercises1 = {exercises1}
      part2 = {part2} exercises2 = {exercises2}
      part3 = {part3} exercises3 = {exercises3}/>
      <Total e1 = {exercises1} e2 = {exercises2} e3 = {exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))