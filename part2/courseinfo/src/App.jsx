const sumExercises = (parts) => {
  let total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0);
  return total;
}

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part, i) => <Part key={i} part={part}/>)}    
  </>

const Course = ({course}) =>{
  return (
  <>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={sumExercises(course.parts)}/>
  </>)
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App