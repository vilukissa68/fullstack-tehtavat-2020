import React from 'react';
import { CoursePart } from '../types';

interface TotalProps {
  courseParts: CoursePart[];

}

const Total: React.FC<TotalProps> = (props) => {
  return(
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

export default Total;