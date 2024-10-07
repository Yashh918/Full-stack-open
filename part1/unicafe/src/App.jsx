import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral
  const average = ((good - bad) / all).toFixed(2)
  const positive =( (good / all) * 100).toFixed(2)

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <StatisticLine name={"good"} value={good} />
          <StatisticLine name={"neutral"} value={neutral} />
          <StatisticLine name={"bad"} value={bad} />
          <StatisticLine name={"all"} value={all} />
          <StatisticLine name={"average"} value={average} />
          <StatisticLine name={"positive"} value={`${positive}%`} />
        </tbody>
      </table>
    )
  }
}

const StatisticLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App