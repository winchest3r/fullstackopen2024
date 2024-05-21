import { useState } from 'react'

const Anecdote = ({ text, votes }) => {
  return (
    <p>
        {text}<br />
        has {votes} votes
    </p>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const getRandInt = (value) => Math.floor(Math.random() * value)

  const [selected, setSelected] = useState(getRandInt(anecdotes.length))
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [max, setMax] = useState(getRandInt(anecdotes.length))

  const selectHandler = () => {
    setSelected(getRandInt(anecdotes.length))
  }

  const voteHandler = () => {
    const index = selected
    const copy = [...points]
    copy[index] += 1
    setPoints(copy)
    if (copy[index] >= copy[max]) {
      setMax(index)
    }
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button onClick={voteHandler} text='vote' />
      <Button onClick={selectHandler} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[max]} votes={points[max]} />
    </>
  )
}

export default App