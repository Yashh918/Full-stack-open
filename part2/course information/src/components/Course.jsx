import Content from "./Content"
import Header from "./Header"
import Total from "./Total";

const Course = ({name, parts}) => {
    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course