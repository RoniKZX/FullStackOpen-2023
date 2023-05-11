import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

function StatisticLine({text, value}) {
  if (text === "Positive")
    return (<>
    <tr><td>{text}</td><td>{value}%</td></tr>
    </>);

  return (
    <>
      <tr><td>{text}</td><td>{value}</td></tr>
    </>
  )
}

function Statistics({feedback}) { // It is between {} because it is actually a prop
  const total = feedback.good + feedback.neutral + feedback.bad
  const average = (feedback.good + feedback.bad * -1) / total
  const positive = feedback.good / total * 100

  if (total === 0)
    return (<h2>No feedback given</h2>);

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="Good" value={feedback.good} />
          <StatisticLine text="Neutral" value={feedback.neutral} />
          <StatisticLine text="Bad" value={feedback.bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

function App(){
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState(
    {
      good: 0,
      neutral: 0,
      bad: 0
    }
  )

  const handleGood = () => {
    const updatedGood = feedback.good + 1

    setFeedback({...feedback, good: updatedGood})
  }
  
  const handleNeutral = () => {
    const updatedNeutral = feedback.neutral + 1
    
    setFeedback({...feedback, neutral: updatedNeutral})
  }
  
  const handleBad = () => {
    const updatedBad = feedback.bad + 1
    
    setFeedback({...feedback, bad: updatedBad})
  }

  return (
    <>
      <h1>Give feedback</h1>

      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />

      <h1>Statistics</h1>
      <Statistics feedback={feedback}/>
    </>
  )
}

export default App