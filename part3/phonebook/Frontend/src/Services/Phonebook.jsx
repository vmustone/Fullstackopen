import axios from 'axios'

const getAll = () => {
    const request = axios.get('/api/persons')
    return request.then(response => {
        return (response.data)
    })
}

const create = (personObject) => {
    const create = axios.post('/api/persons', personObject)
    return create.then(response => {
        return (response.data)
    })
}

const remove = (id) => {
    const remove = axios.delete(`/api/persons/${id}`)
    return remove.then(response => {
        return (response.data)
    })
}

const replace = (id, newNumber, name) => {
    const rePlace = axios.put(`/api/persons/${id}`, {name: name, number: newNumber})
    return rePlace.then(response => {
        return (response.data)
    })
}

export default {getAll, create, remove, replace}