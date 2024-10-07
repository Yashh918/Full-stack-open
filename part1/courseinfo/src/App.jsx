// import Content from "./components/Content"
// import Header from "./components/Header"
// import Total from "./components/Total";



// const App = () => {
//   const course = 'Half Stack application development'
//   const parts = [
//     { name: 'Fundamentals of React', exercises: 10 },
//     { name: 'Using props to pass data', exercises: 7 },
//     { name: 'State of a component', exercises: 14 },
//   ];

//   return (
//     <div>
//       <Header course={course}/>
//       <Content parts={parts}/>
//       <Total parts={parts}/>
//     </div>
//   )
// }

// export default App

import { useState } from "react"
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    console.log('left before: ', left);
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    console.log('left after: ', left);
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    console.log('right before ', right);
    setRight(right + 1)
    console.log('right after ', right);
    setTotal(left + right)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>

      <p>total {total}</p>
    </div>
  )
}

export default App