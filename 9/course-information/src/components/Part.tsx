import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utilities';

interface PartProps {
  part: CoursePart;
  index: number;
}

const Part: React.FC<PartProps> = (props) => {
  const part = props.part;
      switch (part.name) {
        case "Fundamentals":
          return <p key={props.index}>{part.name} {part.exerciseCount} {part.description}</p>
        case "Using props to pass data":
          return <p key={props.index}>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
        case "Deeper type usage":
          return <p key={props.index}>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
        case "End is near":
          return <p key={props.index}>{part.name} {part.exerciseCount} {part.description} {part.gpa}</p>
        default:
          return assertNever(part)
        }
}

export default Part;