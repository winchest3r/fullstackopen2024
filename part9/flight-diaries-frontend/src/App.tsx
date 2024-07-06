import { useState, useEffect } from 'react';

import { Diary } from './types';
import diariesService from './services/diaries';

import Header from './components/Header';
import Note from './components/Note';
import NewDiaryForm from './components/NewDiaryForm';
import Content from './components/Content';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    diariesService
      .getAllDiaries()
      .then(data => setDiaries(data));
  }, []);

  return (
    <div>
      <Header name="Add new entry" />
      <Note text={note}/>
      <NewDiaryForm diaries={diaries} setDiaries={setDiaries} setNote={setNote} />
      <Header name="Diary entries" />
      <Content diaries={diaries} />
    </div>
  );
};

export default App;