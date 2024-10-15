import axios from "axios";
const baseUrl = '/api/persons'

const create = async (newObject) => {
    const res = await axios.post(baseUrl, newObject)
    return res.data
}

const getAllContacts = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getContact = async (id) => {
    const url = `${baseUrl}/${id}`
    const res = await axios.get(url)
    return res.data
}

const deleteContact = async (id) => {
    const url = `${baseUrl}/${id}`
    const res = await axios.delete(url)
    return res.data
}

const updateContact = async (id, newObject) => {
    const url = `${baseUrl}/${id}`
    const res = await axios.put(url, newObject)
    return res.data
}

export default {
    create,
    getAllContacts,
    getContact,
    deleteContact,
    updateContact
}