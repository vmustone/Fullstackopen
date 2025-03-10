const Persons = ({persons, filterName, handleDelete}) => {
    return (
      persons.filter((item) => filterName.trim() === "" ? true : item.name.toLowerCase().includes(filterName.toLowerCase()))
        .map((item) => {
          return (
            <div key={item.id} style={{ display: "flex", alignItems: "center"}}>
              <p>{item.name} {item.number}</p>
              <button onClick={() => handleDelete(item)}>Delete</button>
            </div>
          )
        })
    )
  }

  export default Persons