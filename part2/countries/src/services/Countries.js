import axios from 'axios'

const countriesAPI = 'https://restcountries.com/v3.1/all'
const fields = '?fields=name,capital,area,languages,flags'

function getAll() {
  const request = axios.get(`${countriesAPI}/${fields}`)

  return request.then(response => response.data)
}

const Countries = { getAll }

export default Countries