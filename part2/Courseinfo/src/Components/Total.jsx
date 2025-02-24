const Total = ({courses}) => {
    const total = courses.parts.reduce((sum, part) => sum + part.exercises, 0)
    
    return (
        <div>
            <b>Total of {total} exercises</b>
        </div>
    )
}

export default Total