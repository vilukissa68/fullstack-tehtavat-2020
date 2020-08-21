import React from 'react';
import { CoursePart } from '../types';
import Part from './Part'


interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <>
    {props.courseParts.map((course, index) => {
      return (<Part key={`part-${index}`} part={course} index={index}/>)
    })}
    </>
  );
};

export default Content;