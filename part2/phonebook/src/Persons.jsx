import Person from "./Person"

const Persons = ({persons}) => {
    return (
        <>
            {persons.map(person => <Person person={person} key={person.id}/>
      )}
        </>
    )
}

export default Persons