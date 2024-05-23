import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {

  const response = await axios.post(baseUrl, newObject, {headers: { Authorization: token }})
  return response.data
}

const updateLike = async blog => {
  await axios.put(`${baseUrl}/${blog.id}`, {likes: blog.likes})
}

export default { getAll, setToken, create, updateLike }