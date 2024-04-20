import axios from 'axios'

const api = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    return axios
            .get(api)
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

export default { search, getAll }