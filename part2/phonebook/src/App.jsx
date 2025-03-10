import { useEffect, useState } from 'react'
import axios from 'axios'
import Persons from './Components/Persons'
import PersonForm from './Components/Personform'
import Filter from './Components/Filter'
import Phonebook from './Services/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filterName, setFilter] = useState('')

  useEffect(() => {
    Phonebook
    .getAll()
    .then(book => {
      setPersons(book)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const personObject = {
      name: newName,
      number: newNumber
    };
  
    // Varmista, että molemmat kentät on täytetty
    if (!newNumber || !newName) {
      alert("Please fill both fields");
      return;
    }
  
    // Tarkista, onko henkilö jo olemassa
    const personToUpdate = persons.find(person => person.name === newName);
  
    if (personToUpdate) {
      // Jos henkilö on jo listassa, pyydetään käyttäjältä vahvistus päivitykselle
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        Phonebook
          .replace(personToUpdate.id, newNumber, personToUpdate.name) // Oletan, että käytät replace-metodia tähän
          .then(() => {
            // Päivitetään henkilö listassa
            const updatedPersons = persons.map(person => 
              person.id === personToUpdate.id ? { ...person, number: newNumber } : person
            );
            setPersons(updatedPersons);
          });
      }
    } else {
      // Jos henkilöä ei löydy, lisätään uusi henkilö
      Phonebook
        .create(personObject) // Oletan, että create-metodi luo uuden henkilön
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
        });
    }
  
    // Tyhjennetään syöttökentät
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
      .then(() => {
        return Phonebook.getAll(); // Odotetaan, että poisto on valmis
      })
      .then(book => {
        console.log('Updated Book after deletion:', book);
        setPersons(book); // Päivitetään henkilöt vasta kun uusi lista on haettu
      })
    }
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
      <Persons persons={persons} filterName={filterName} handleDelete={handleDelete}/>
    </div>
  )
}


export default App