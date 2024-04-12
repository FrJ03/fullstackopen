import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  const response = request.then(response => response.data)
  console.log(response)
  return response
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

export default { getAll, create }