import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personsFiltered, setPersonsFiltered] = useState(persons) 
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={filter} onChange={handlerFilter}/></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlerNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handlerNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsFiltered.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App
