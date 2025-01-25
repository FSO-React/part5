const Person = ({ id, name, number, deletePerson}) => {
    return (
      <li key={id} className="person"> 
        {name} {number}   
        <button onClick={deletePerson}>delete</button>
      </li>
    )
}

export default Person;