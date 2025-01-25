import axios from 'axios'
const url = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  return axios.get(`${url}/all`)
}

const getOne = (name) => {
  return axios.get(`${url}/api/name/${name}`)
}

export default { 
  getAll,
  getOne,
}