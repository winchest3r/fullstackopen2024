import { Diary } from '../types';

interface ContentProps {
  diaries: Diary[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.diaries.map(d => 
        <div key={d.id}>
          <h3>{d.date}</h3>
          <div>
            visibility: {d.visibility}<br />
            weather: {d.weather}
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
