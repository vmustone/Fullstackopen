import { useEffect, useState } from 'react'
import Persons from './Components/Persons'
import PersonForm from './Components/Personform'
import Filter from './Components/Filter'
import Notification from './Components/Notification'
import Phonebook from './Services/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterName, setFilter] = useState('')
  const [notification, setMessage] = useState({message: null, color: "green"})

  useEffect(() => {
    Phonebook
    .getAll()
    .then(book => {
      setPersons(book)
    })
    .catch(error => {
      setMessage({message: error.response.data.error, color: "red"})
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const personObject = {
      name: newName,
      number: newNumber
    };

    const personToUpdate = persons.find(person => person.name === newName);
  
    if (personToUpdate) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        Phonebook
          .replace(personToUpdate.id, newNumber, personToUpdate.name)
          .then(() => {
            const updatedPersons = persons.map(person => 
              person.id === personToUpdate.id ? { ...person, number: newNumber } : person
            );
            setPersons(updatedPersons);
            setMessage({message: `Updated ${personToUpdate.name}'s number`, color: "green"})

            setTimeout(() => {
              setMessage({message: null})
            }, 4000)
          })
          .catch(error => {
            setMessage({message: error.response.data.error, color: "red"})

            setTimeout(() => {
              setMessage({message: null})
            }, 4000)
          })
      }
    } else {
      Phonebook
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setMessage({message: `Added ${newPerson.name}`, color: "green"})

          setTimeout(() => {
            setMessage({message: null})
          }, 4000)
        })
        .catch(error => {
          setMessage({message: error.response.data.error, color: "red"})

          setTimeout(() => {
            setMessage({message: null})
          }, 4000)
        })
      }
    setNewName('');
    setNumber('');
  };
  

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      Phonebook
      .remove(person.id)
      .then(() => Phonebook.getAll())
      .then(book => {
        setPersons(book)
        setMessage({message: `${person.name} removed`, color: "green"})

        setTimeout(() => {
          setMessage({message: null})
      }, 4000)
      })
      .catch(error => {
        setMessage({message: error.response.data, color: "red"})

        setTimeout(() => {
          setMessage({message: null})
      }, 4000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} color={notification.color} />
      <Filter value={filterName} handler={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleNumber={handleNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterName={filterName} handleDelete={handleDelete}/>
    </div>
  )
}


export default App