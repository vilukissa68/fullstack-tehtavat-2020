import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <h1> {props.course.name} </h1>
  )
}

const Part = props => {
  return ( 
  <>
  <p>{props.name} {props.exercises} </p>
  </>
  )
}

const Content = props => {
  const returns = []
  props.course.parts.forEach(element => {
    returns.push(Part(element))
  })

  return (
    <>
    {returns}
    </>
  )
}

const Total = props => {
  let x = 0
  props.course.parts.forEach(element => {
    x += element.exercises
  });
  return(
  <>
  <p>Number of exercises {x}</p>
  </>
  )
}


const App = () => {
  const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
    name: 'Using props to pass data',
    exercises: 7
    },
    {
    name: 'State of a component',
    exercises: 14
    }
  ]
}

  return (
    <div>
      <Header course = {course}/>
      <Content course = {course}/>
      <Total course = {course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))