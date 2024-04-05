const sumExercises = (parts) => {
    let total = parts.reduce((sum, part) => {
      return sum + part.exercises
    }, 0);
    return total;
  }
  
  const Header = ({ course }) => <h2>{course}</h2>
  
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

export default Course