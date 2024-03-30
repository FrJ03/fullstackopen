import { useState } from 'react'
import Header from './Header'
import Button from './Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header content='give feedback'/>
      <div>
        <Button content='good' onClick={() => setGood(good + 1)}/>
        <Button content='neutral' onClick={() => setNeutral(neutral + 1)}/>
        <Button content='bad' onClick={() => setBad(bad + 1)}/>
      </div>
      <Header content='statistics'/>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App