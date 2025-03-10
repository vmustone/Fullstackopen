import axios from 'axios'

const getAll = () => {
    const request = axios.get('http://localhost:3001/persons')
    return request.then(response => {
        return (response.data)
    })
}

const create = (personObject) => {
    const create = axios.post('http://localhost:3001/persons', personObject)
    return create.then(response => {
        return (response.data)
    })
}

const remove = (id) => {
    const remove = axios.delete(`http://localhost:3001/persons/${id}`)
    return remove.then(response => {
        return (response.data)
    })
}

const replace = (id, newNumber, name) => {
    const rePlace = axios.put(`http://localhost:3001/persons/${id}`, {name: name, number: newNumber})
    return rePlace.then(response => {
        return (response.data)
    })
}

export default {getAll, create, remove, replace}