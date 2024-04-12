import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deletePerson = person => {
    const personUrl = `${baseUrl}/${person.id}`
    return axios
            .delete(personUrl)
            .then(response => response.data)
}

export default { getAll, create, deletePerson }