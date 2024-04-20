import axios from 'axios'

const apiAll = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const apiName = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
    return axios
            .get(apiAll)
            .then(response => response.data)
}

const search = (filter) => {
    return getAll()
            .then(data => 
                data.filter((country) =>
                    country.name.common
                        .toLowerCase()
                        .includes(filter.toLowerCase()))
                )
}

const findByName = (name) => {
    return axios
            .get(apiName + name)
            .then(response => response.data)
}

export default { search , findByName }