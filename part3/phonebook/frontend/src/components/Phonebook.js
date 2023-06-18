function Filter({ value, onChange }) {
  return <label>filter by name <input type="text" value={value} onChange={onChange} id="filter" name="filter" /></label>
}

function PersonForm({ onSubmit, nameValue, handleNameChange, numberValue, handleNumberChange }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">name: </label>
          <input type="text" value={nameValue} onChange={handleNameChange} id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input type="text" value={numberValue} onChange={handleNumberChange} id="number" name="number" required />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  )
}

function Person({ person, removePerson }) {
  return (
    <>
      <li>
        {person.name} {person.number} <button onClick={removePerson}>delete</button>
      </li>
    </>
  )
}

export { Filter, PersonForm, Person }