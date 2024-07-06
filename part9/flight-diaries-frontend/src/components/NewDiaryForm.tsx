import { useState } from 'react';

import diariesService from '../services/diaries';

import { Diary, NewDiary, Visibility, Weather} from '../types';

interface NewDiaryFormProps {
  diaries: Diary[];
  setDiaries: (diaries: Diary[]) => void;
  setNote: (note: string) => void;
}

const NewDiaryForm = (props: NewDiaryFormProps): JSX.Element => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [visibility, setVisibility] = useState(Object.values(Visibility)[0].toString());
  const [weather, setWeather] = useState(Object.values(Weather)[0].toString());
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newObject: NewDiary = {
      date,
      visibility,
      weather,
      comment,
    };

    diariesService
      .createDiary(newObject)
      .then(data => props.setDiaries(props.diaries.concat(data as Diary)))
      .catch(error => {
        if (error instanceof Error) {
          props.setNote(error.message);
          setTimeout(() => props.setNote(''), 3000);
        }
      });
    
    setDate(new Date().toISOString().split('T')[0]);
    setComment('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <fieldset>
          <legend>visibility</legend>
          {Object.values(Visibility).map(v => {
            const str = v.toString();
            return <div key={str}>
              <input 
                type="radio"
                id={str}
                name="visibility"
                onChange={() => setVisibility(str)}
                checked={str === visibility}
              />
              {str}
            </div>;
          })}
        </fieldset>
        <fieldset>
          <legend>weather</legend>
          {Object.values(Weather).map(v => {
            const str = v.toString();
            return <div key={str}>
              <input 
                type="radio"
                id={str}
                name="weather"
                onChange={() => setWeather(str)}
                checked={str === weather}
              />
              {str}
            </div>;
          })}
        </fieldset>
        <div>
          <input
            placeholder="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;