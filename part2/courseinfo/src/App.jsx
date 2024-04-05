const sumExercises = (parts) => {
  let total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0);
  return total;
}

const Header = ({ header }) => <h1>{header}</h1>

const CourseHeader = ({ course }) => <h2>{course}</h2>

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
    <CourseHeader course={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={sumExercises(course.parts)}/>
  </>)
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header header={'Web development curriculum'}/>
      {courses.map((course, i) => <Course course={course} key={i}/>)}
    </div>
  )
}

export default App