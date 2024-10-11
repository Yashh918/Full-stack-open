import { useEffect, useState } from "react"
import Filter from "./components/Filter"

function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [one, setOne] = useState(null)

  useEffect(() => {
    if (!search) {
      setData([])
      setOne(null)
    }
  }, [search])

  return (
    <div>
      <label>find countries </label>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {
        search
          ? <Filter
            search={search}
            data={data}
            setData={setData}
            one={one}
            setOne={setOne}
          />
          : <div>type something</div>
      }
    </div>
  )
}

export default App
