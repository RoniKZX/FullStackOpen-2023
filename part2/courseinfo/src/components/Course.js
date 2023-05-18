function Header({ course }) {
  return <h1>{course}</h1>
}

function Total({ parts }) {
  const sum = parts.reduce((total, currentValue) => {
    return { exercises: total.exercises + currentValue.exercises }
  })

  return <p><strong>Total of {sum.exercises} exercises</strong></p>
}

function Part({ part }) {
  return <p>{part.name} {part.exercises}</p>
}

function Content({ parts }) {

  return parts.map(part => (
    <Part key={part.id} part={part} />
  ))
}

function Course({ course }) {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course