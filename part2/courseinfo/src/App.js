import Course from './components/Course'

function App(props) {

  const courses = props.courses.map((course) => <Course key={course.id} course={course} />)

  return (
    <>
      {courses}
    </>
  );
}

export default App;
