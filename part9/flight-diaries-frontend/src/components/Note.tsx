interface NoteProps {
  text: string,
}

const Note = (props: NoteProps): JSX.Element => {
  return (
    <h4>
      {props.text !== '' ? <div style={{ color: 'red' }}>{props.text}</div> : null}
    </h4>
  );
};

export default Note;