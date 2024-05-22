const Header = ({ data }) => <><h2>{data.name}</h2></>

const Part = ({ text, exCount }) => <><p>{text} {exCount}</p></>

const Content = ({ data }) => {
  return (
    <>
      {data.parts.map(
        (part) => 
          <Part key={part.id} text={part.name} exCount={part.exercises} />
        )
      }
    </>
  )
}

const Total = ({ data }) => {
  return (
    <>
      <p><b>
        total of {data.parts.reduce((total, p) => total + p.exercises, 0)} exercises
      </b></p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header data={course} />
      <Content data={course} />
      <Total data={course} />
    </>
  )
}

export default Course