import React from 'react'

const Header = (props) => {
    return(
      <h1> {props.name} </h1>
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
    console.log("Content:")
    console.log(props)
    return(
      <>
      {props.parts.map((part) =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
      </>
    )
  }
  
  const Course = props => {
    console.log("Course:")
    console.log(props)
    return (
      <>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
      </>
    )
  }
  
  const Total = props => {
    const total = props.parts.reduce( (prev, current) => 
      prev + current.exercises, 0
    )
    return(
    <p><b>total of {total} exercises</b></p>
    )
  }
  
export default Course