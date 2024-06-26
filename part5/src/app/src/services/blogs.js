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

  const response = await axios.post(baseUrl, newObject, { headers: { Authorization: token } })
  return response.data
}

const update = async blog => {
  const b = { ...blog }

  delete b.id
  if(Object.hasOwn(b, 'user')){
    b.user = b.user.id
  }

  await axios.put(`${baseUrl}/${blog.id}`, b)
}

const deleteBlog = async blog => {
  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`,{ headers: { Authorization: token } })
    return response.status
  } catch (error) {
    return error.response.status
  }
}

export default { getAll, setToken, create, update, deleteBlog }