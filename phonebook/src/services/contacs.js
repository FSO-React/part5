import axios from 'axios'
const url = '/api/persons'

const getAll = async () => {
  return await axios.get(url)
}

const getOne = async (id) => {
  return await axios.get(`${url}/${id}`)
}

const create = async (newContact) => {
  return await axios.post(url, newContact)
}

const update = async (id, newContact) => {
  return await axios.put(`${url}/${id}`, newContact)
}

const remove = async (id) => {
  return await axios.delete(`${url}/${id}`)
}

export default { 
  getAll,
  getOne,
  create, 
  update,
  remove,
}