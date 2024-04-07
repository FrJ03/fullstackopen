import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState([]) 
  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPersonsFiltered(response.data)
      })
  }, [])

  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personExists = (name, personsList) => {
    let ret = false
    for(let i = 0 ; i < personsList.length && ret === false; i++){
      if(personsList[i].name === name){
        ret = true
      }
    }
    return ret
  }

  const filterPerson = (filterStr) => {
    if(filterStr === ''){
      setPersonsFiltered(persons)
    }
    else{
      setPersonsFiltered(persons.filter((person) => person.name.toLowerCase().includes(filterStr.toLowerCase())))
    }
  }

  const handlerFilter = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    filterPerson(newFilter)
  }

  const handlerNameChange = (event) => 
    setNewName(event.target.value)
  
  const handlerNumberChange = (event) => 
    setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    }
    if(personExists(newPerson.name, persons) === false){
      const newPersons = persons.concat(newPerson)
      setPersons(newPersons)
      setFilter('')
      setPersonsFiltered(newPersons)
    }
    else{
      alert(`${newPerson.name} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const personForm = {
    elements: [
      {
        label: 'name',
        value: newName,
        handler: handlerNameChange
      },
      {
        label: 'number',
        value: newNumber,
        handler: handlerNumberChange
      }
    ],
    submit: {
      text: 'add',
      handler: addPerson
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handler={handlerFilter}/>
      <h2>add a new</h2>
      <PersonForm form={personForm}/>
      <h2>Numbers</h2>
      <Persons persons={personsFiltered}/>
    </div>
  )
}

export default App
