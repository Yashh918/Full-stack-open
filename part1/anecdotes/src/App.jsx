import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [maxVotes, setMaxVotes] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  const nextClick = () => {
    const next = Math.floor(Math.random() * anecdotes.length)
    setSelected(next)
  }

  const currVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    if(copy[selected] > maxVotes){
      setMaxVotes(copy[selected])
      setMaxIndex(selected)
    }     
  }

  const maxVoteClick = () => {
    const copy = [...points]
    copy[maxIndex] += 1
    setPoints(copy)

    setMaxVotes((prev) => prev + 1)
  }


  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <button onClick={currVoteClick}>
        vote
      </button>
      <button onClick={nextClick}>
        next anecdote
      </button>

      <h2>Anecdote with most votes</h2>
      {maxVotes !== 0 ? (
        <div>
          <div>
            {anecdotes[maxIndex]}
          </div>
          <div>
            has {points[maxIndex]} votes
          </div>
          <button onClick={maxVoteClick}>
            vote
          </button>
        </div>
      ) : (
        <div>
          No votes yet
        </div>
      )}

    </div>
  )
}

export default App