import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const personExists = (name, personsList) => {
    let ret = false
    for(let i = 0 ; i < personsList.length && ret === false; i++){
      if(personsList[i].name === name){
        ret = true
      }
    }
    return ret
  }

  const handlerNameChange = (event) => 
    setNewName(event.target.value)
  
  const handlerNumberChange = (event) => 
    setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if(personExists(newPerson.name, persons) === false){
      setPersons(persons.concat(newPerson))
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
      {persons.map((person, i) =>
        <p key={i}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App
