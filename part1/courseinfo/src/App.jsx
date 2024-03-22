import Header from './Header.jsx'
import Content from './Content.jsx'
import Total from './Total.jsx'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const content = [{part: part1, exercises: exercises1},
                   {part: part2, exercises: exercises2},
                   {part: part3, exercises: exercises3}]

  return (
    <div>
      <Header course={course}/>
      <Content content={content}/>
      <Total sum={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
