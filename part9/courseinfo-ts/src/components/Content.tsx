import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courses: CoursePart[]
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.courses.map(c => 
        <Part key={c.name} course={c} />
      )}
    </div>
  )
};

export default Content;