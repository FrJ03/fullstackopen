import { useState, useEffect, React } from 'react'
import Header from './Header'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0.0)
  const [positive, setPosotive] = useState(0.0)

  const incrementGood = () => {
    const newGood = good+1 
    const newAll = all + 1
    setGood(newGood)
    setAll(newAll)
    setAvg((newGood - bad) / newAll)
    setPosotive(newGood / newAll)
  }
  const incrementNeutral = () => {
    const newAll = all + 1
    setNeutral(neutral + 1)
    setAll(newAll)
    setAvg((good - bad) / newAll)
    setPosotive(good / newAll)
  }
  const incrementBad = () => {
    const newBad = bad + 1
    const newAll = all + 1
    setBad(newBad)
    setAll(newAll)
    setAvg((good - newBad) / newAll)
    setPosotive(good / newAll)
  }

  const statistics = [
    {
      text:'good',
      value:good
    },
    {
      text:'neutral',
      value:neutral
    },
    {
      text:'bad',
      value:bad
    },
    {
      text:'all',
      value:all
    },
    {
      text:'average',
      value:avg
    },
    {
      text:'positive',
      value:positive + ' %'
    },
  ]
  return (
    <div>
      <Header content='give feedback'/>
      <div>
        <Button content='good' onClick={incrementGood}/>
        <Button content='neutral' onClick={incrementNeutral}/>
        <Button content='bad' onClick={incrementBad}/>
      </div>
      <Header content='statistics'/>
      <Statistics stats={statistics}/>
    </div>
  )
}

export default App