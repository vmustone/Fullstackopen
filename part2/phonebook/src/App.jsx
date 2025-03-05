import { useState } from 'react'

const Filter = ({value, handler}) => {
  return (
    <div>filter shown with
    <input
    value={value}
    onChange={handler} />
    </div>
  )
}

const PersonForm = ({newName, newNumber, handleSubmit, handleName, handleNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input
          value={newName}
          onChange={handleName} />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, filterName}) => {
  return (
    persons.filter((item) => filterName.trim() === "" ? true : item.name.toLowerCase().includes(filterName.toLowerCase()))
      .map((item, index) => {
        return <p key={index}>{item.name} {item.number}</p>
      })
  )
}

const App = () => {
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterName, setFilter] = useState('')

  const handleSubmit = (event) => {
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (!newNumber || !newName) {
      alert("Plese fill both fields")
      return
    }
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
    }
    setNewName('')
    setNumber('')
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} handler={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleNumber={handleNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterName={filterName}/>
    </div>
  )
}

export default App