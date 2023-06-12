import { useState, useEffect } from 'react'
import Countries from './services/Countries'
import Results from './components/Results'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    Countries
      .getAll()
      .then(fetchedCountries => setCountries(fetchedCountries))
  }

  useEffect(hook, [])

  // Filter by name
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toString().toLowerCase()))
  const handleSearch = event => setFilter(event.target.value)

  return (
    <>
      <label>find countries <input type="text" value={filter} onChange={handleSearch} placeholder="Type a country's name" /></label>

      <Results countriesToShow={countriesToShow} setFilter={setFilter} />
    </>
  );
}

export default App;
