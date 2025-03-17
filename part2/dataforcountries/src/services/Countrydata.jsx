import axios from 'axios'

const getAll = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => {
        return (response.data)
    })
}

export default { getAll } 