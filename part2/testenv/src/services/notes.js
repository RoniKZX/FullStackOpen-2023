import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

function getAll() {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

function create(newObject) {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

function update(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// Since the object keys and properties have the same
// name, you can just write them like this:
export default { getAll, create, update }