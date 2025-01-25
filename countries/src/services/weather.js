import axios from 'axios'
const url = 'https://api.openweathermap.org'

const getAll = () => {
  return axios.get(`${url}/...`)
}

const getOne = ({ lat, lon, capital, apiKey }) => {
  if (!apiKey) {
    console.error('API key is missing. Check your .env.local configuration.');
    return;
  }
  return axios.get(`${url}/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
}

export default { 
  getAll,
  getOne,
}