const Total = ({parts}) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>
            total of exercises {totalExercises}
        </p>
    )
}

export default Total