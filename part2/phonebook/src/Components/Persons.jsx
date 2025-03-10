const Persons = ({persons, filterName, handleDelete}) => {
    return (
      persons.filter((item) => filterName.trim() === "" ? true : item.name.toLowerCase().includes(filterName.toLowerCase()))
        .map((item) => {
          return (
            <p key={item.id}>{item.name} {item.number}
              <button onClick={() => handleDelete(item)}>Delete</button>
            </p>
          )
      })
    )
  }

  export default Persons