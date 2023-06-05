import { useState, useEffect } from 'react'
import { Filter, PersonForm, People } from './components/Phonebook'
import axios from 'axios'

function App() {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Using axios and effect hooks to request data
  useEffect(() => {
    console.log('requesting data...')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('data requested successfully')
        setPeople(response.data)
      })
  }, [])

  // Filter by name
  const peopleToShow = people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: people.length + 1
    }

    if (people.find(p => p.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`)
    } else {
      setPeople(people.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        handleNameChange={handleNameChange}
        numberValue={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <People people={peopleToShow} />
    </div>
  )
}

export default App