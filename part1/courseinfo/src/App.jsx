const Header = (props) => {
  return (
    <>
      <h1>{props.data.name}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.text} {props.exCount}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part text={props.data.parts[0].name} exCount={props.data.parts[0].exercises} />
      <Part text={props.data.parts[1].name} exCount={props.data.parts[1].exercises} />
      <Part text={props.data.parts[2].name} exCount={props.data.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises {
          props.data.parts[0].exercises + 
          props.data.parts[1].exercises + 
          props.data.parts[2].exercises
        }
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header data={course} />
      <Content data={course} />
      <Total data={course} />
    </>
  )
}

export default App