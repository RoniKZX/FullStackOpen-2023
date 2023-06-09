import { useState, useEffect } from 'react'
import { Filter, PersonForm, Person } from './components/Phonebook'
import peopleService from './services/people'

function App() {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Using axios and effect hooks to request data
  useEffect(() => {
    console.log('requesting data...')
    peopleService
      .getAll()
      .then(requestedPeople => {
        console.log('data requested successfully')
        setPeople(requestedPeople)
      })
      .catch(error => { console.log('data request failed.') })
  }, [])

  // Filter by name
  const peopleToShow = people.filter(person => person.name.toLowerCase().includes(filter.toString().toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingPerson = people.find(p => p.name === newPerson.name)

    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        peopleService
          .update(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPeople(people.map(person => person.id === existingPerson.id ? returnedPerson : person))
          })
      }
    } else {
      peopleService
        .create(newPerson)
        .then(newlyCreatedPerson => {
          setPeople(people.concat(newlyCreatedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = id => {
    const personToRemove = people.find(person => person.id === id)

    if (window.confirm(`Delete ${personToRemove.name}`)) {
      peopleService
        .remove(personToRemove.id)
        .then(removedPerson => {
          setPeople(people.filter(people => people.id !== id))
        })

        .catch(response => {
          setPeople(people.filter(people => people.id !== id))

          if (response.response.status === 404) {
            console.log(`That person didn't exist`)
          }
        })
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
      <ul>
        {
          peopleToShow.map(person =>
            <Person key={person.id} person={person} removePerson={() => removePerson(person.id)} />)
        }
      </ul>
    </div>
  )
}

export default App