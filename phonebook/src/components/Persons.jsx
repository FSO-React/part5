import Person from './Person'

const Persons = ({ persons, filter, deletePerson }) => {
    // filtrado
    const personsToShow = (filter.trim().length > 0) ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

    return (
        <ul>
        {personsToShow.map(person => 
          <Person key={person.id} id={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person)}></Person>
        )}
        </ul>
    )
}

export default Persons;