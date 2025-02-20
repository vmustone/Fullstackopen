import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
  return (
      <button onClick={handleClick}>{text}</button>
  )
}
const StatisticLine = ({ text, value, sign }) => {
  return (
    <tr>
      <td>{text} {value}{sign}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = all > 0 ? (good * 1 + neutral * 0 + bad * -1) / all : 0;
  const positive = all > 0 ? good / all * 100 : 0
  
  if (all === 0)
    return <p>No feedback given</p>;
  
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} sign=''/>
        <StatisticLine text="neutral" value={neutral} sign=''/>
        <StatisticLine text="bad" value={bad} sign=''/>
        <StatisticLine text="all" value={all} sign=''/>
        <StatisticLine text="average" value={average} sign=''/>
        <StatisticLine text="positive" value={positive} sign='%'/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App