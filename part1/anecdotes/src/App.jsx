import { useState } from 'react'
import Button from './Button'
import Header from './Header'

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
   
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] =useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const changeSelected = ()=>{
    const currentSelected = selected
    let newSelected = Math.trunc(Math.random() * (anecdotes.length))
    while(currentSelected === newSelected){
      newSelected = Math.trunc(Math.random() * (anecdotes.length))
    }
    setSelected(newSelected)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    if(copy[selected] > copy[mostVoted]){
      setMostVoted(selected)
    }
  }

  return (
    <div>
      <Header content='Anecdote of the day'/>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <div>
        <Button content='vote' onClick={vote}/>
        <Button content='next anecdote' onClick={changeSelected}/>
      </div>
      <Header content='Anecdote with most votes'/>
      {anecdotes[mostVoted]}
      <div>has {votes[mostVoted]} votes</div>
    </div>
  )
}

export default App
