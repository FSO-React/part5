import Input from './Input'

const PersonsForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addContact }) => {
  return (
    <form onSubmit={addContact}>
      <Input text='name' value={newName} onChange={handleNameChange}></Input>
      <Input text='number' value={newNumber} onChange={handleNumberChange}></Input>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonsForm;