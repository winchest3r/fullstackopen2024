import { CoursePart } from "../types"

import { assertNever } from "../utils";

interface CoursePartProps {
  course: CoursePart
}

const Part = (props: CoursePartProps): JSX.Element => {
  switch (props.course.kind) {
    case 'basic':
      return <div>
        <h3>{props.course.name} {props.course.exerciseCount}</h3>
        <div><em>{props.course.description}</em></div>
      </div>;
    case 'group':
      return <div>
        <h3>{props.course.name} {props.course.exerciseCount}</h3>
        <div>project exercises {props.course.groupProjectCount}</div>
      </div>;
    case 'background':
      return <div>
        <h3>{props.course.name} {props.course.exerciseCount}</h3>
        <div><em>{props.course.description}</em></div>
        <div>submit to 
          <a href={props.course.backgroundMaterial}>
            {props.course.backgroundMaterial}
          </a>
        </div>
      </div>;
    case 'special':
      return <div>
        <h3>{props.course.name} {props.course.exerciseCount}</h3>
        <div><em>{props.course.description}</em></div>
        <div>required skills: {props.course.requirements.join(', ')}</div>
      </div>
    default:
      return assertNever(props.course);
  }
};

export default Part;