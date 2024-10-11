import axios from "axios";
const baseUrl = 'http://localhost:3060/persons'

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}

const getAllContacts = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const getContact = (id) => {
    const url = `${baseUrl}/${id}`
    return axios.get(url)
}

const deleteContact = (id) => {
    const url = `${baseUrl}/${id}`
    const request =  axios.delete(url)
    return request.then(res => res.data)
}

const updateContact = (id, newObject) => {
    const url = `${baseUrl}/${id}`
    const request = axios.put(url, newObject)
    return request.then(res => res.data)
}

export default {
    create,
    getAllContacts,
    getContact,
    deleteContact,
    updateContact
}