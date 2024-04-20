import axios from 'axios'

const key = import.meta.env.VITE_SOME_KEY

const getWeather = (lat, lon) => {
    return axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
            .then(response => response.data)
}

export default {getWeather}