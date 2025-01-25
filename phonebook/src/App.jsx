import contactService from './services/contacs'
import { useState, useEffect } from 'react'

import Header from './components/Header'
import Input from './components/Input'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const fetchPersons = async () => {
    await contactService.getAll()
      .then(({ data }) => {
        setPersons(data);
      })
      .catch(error => {
        defineMessage({ message:error.response.data.error, isSuccess:false })
      });
  };

  const addContact = async (event) => {
    event.preventDefault()
    if (!verifyNewName()) return;
    const contactObject = {
      name: newName,
      number: newNumber,
    }

    await contactService.create(contactObject)
      .then(({ data }) => {
        setPersons(persons.concat(data))
        defineMessage({ message:`The contact ${contactObject.name} has been added properly`, isSuccess:true })
      })
      .catch((error) => {
        console.log(error.response.data.error);
        defineMessage({ message: error.response.data.error, isSuccess:false })
      });
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = async ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      await contactService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          defineMessage({ message: `The contact ${name} has been removed from server`, isSuccess:true })
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== id))
          defineMessage({ message: `The contact ${name} has already been removed from server`, isSuccess:false })
        });
    }
  }

  const updatePerson = async (id, newContact) => {
    await contactService.update(id, newContact)
      .then(({ data }) => {
        setPersons(persons.map(person => person.id !== id ? person : data))
        setSuccessMessage(`The contact ${data.name} changed properly to the phonenumber ${data.number}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch((error) => {
        defineMessage({ message: error.response.data.error, isSuccess:false })
      });
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const verifyNewName = () => {
    if (persons.some(person => person.name === newName)) {
      console.log('!!! repeated name', newName)
      if (window.confirm(`'${newName}' is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        updatePerson(person.id, updatedPerson)
      }
      return false
    }
    return true
  }

  const defineMessage = ({ message, isSuccess }) => {
    //success
    if (isSuccess) {
      setSuccessMessage(message)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      return
    }
    //error
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    return
  }

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div>
      <Header text='Phonebook'></Header>
      <Notification status='success' message={successMessage}></Notification>
      <Notification status='error' message={errorMessage}></Notification>
      <Input text='filter shown with' value={filterName} onChange={handleFilterChange}></Input>
      {/* input generalizado para filtro e inputs del form */}
      
      <Header text='add a new'></Header>
      <PersonsForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addContact={addContact}></PersonsForm>

      <Header text='Numbers'></Header>
      <Persons persons={persons} filter={filterName} deletePerson={deletePerson}></Persons>
    </div>
  )
}

export default App