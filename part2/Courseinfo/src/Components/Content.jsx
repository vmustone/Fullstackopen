import Header from './Header.jsx'
import Total from './Total.jsx'

const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
}

const Content = ({courses}) => { 
    return (
      <div>
        <Header text={courses.name} size="h2"/>
        {courses.parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
        <Total courses={courses}/>
      </div>
    )
}

export default Content