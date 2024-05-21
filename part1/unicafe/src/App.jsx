import { useState } from 'react'


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <>No feedback given</>
  }

  const total = good + neutral + bad

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={(good - bad) / total} />
        <StatisticLine text='positive' value={good / total * 100 + " %"} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttonHandler = (value, setValue) => () => setValue(value + 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={buttonHandler(good, setGood)} text='good'/>
      <Button onClick={buttonHandler(neutral, setNeutral)} text='netural'/>
      <Button onClick={buttonHandler(bad, setBad)} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App