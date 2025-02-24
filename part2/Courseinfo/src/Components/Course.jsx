import Header from './Header.jsx'
import Content from './Content.jsx'

const Course = ({courses}) => {
    return (
        <div>
            <Header text="Web development curriculum" size="h1"/>
            {courses.map((course, index) => (
                <Content key={index} courses={course} />
            ))}
        </div>
    )
}

export default Course