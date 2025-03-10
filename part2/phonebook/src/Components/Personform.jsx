const PersonForm = ({newName, newNumber, handleSubmit, handleName, handleNumber}) => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          name: <input
            value={newName}
            onChange={handleName} />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default PersonForm