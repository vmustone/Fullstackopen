import axios from 'axios'

const getAll = (capital) => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
    return request.then(response => {
        return (response.data)
    })
}

export default { getAll }