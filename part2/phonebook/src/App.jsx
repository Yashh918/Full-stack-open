import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from './services/persons.js'
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await personServices.getAllContacts()
      setPersons(data)
    }
    fetchData()
  }, [setPersons])

  const onAdd = async (e) => {
    e.preventDefault()
    const cleanedName = newName.trim()
    const cleanedNumber = newNumber.trim();

    if (!cleanedName) return setMessage({
      type: "error",
      text: "Name cannot be empty"
    })

    const phoneRegex = /^\+?(\d{2,3})?[-\s]?\d{6,15}$/
    if (!phoneRegex.test(cleanedNumber)) return setMessage({
      type: "error",
      text: "Please enter a valid phone number"
    })

    const isDuplicateNumber = persons.some(person => person.number === cleanedNumber)
    const isDuplicateName = persons.some(person => person.name === cleanedName)

    if (isDuplicateNumber) return setMessage({
      type: "error",
      text: `${newNumber} is already added to phonebook`
    })

    if (isDuplicateName && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {

      const contact = persons.find(p => p.name === cleanedName)
      try {
        const updatedContact = { ...contact, number: cleanedNumber }
        const updatedPersons = await personServices.updateContact(contact.id, updatedContact)
        setPersons(updatedPersons)
        setMessage({
          text: `${cleanedName} has been updated to [${cleanedNumber}] successfully.`,
          type: 'success'
        })
      }
      catch {
        const updatedPersons = persons.filter(p => p.name !== contact.name)
        setPersons(updatedPersons)
        setMessage({
          text: `${contact.name} [${contact.number}] has already been deleted.`,
          type: 'error'
        })
        setTimeout(() => setMessage(null), 5000);
      }

      return
    }

    const newPerson = {
      name: cleanedName,
      number: cleanedNumber
    }

    try {
      const newContact = await personServices.create(newPerson)
      setPersons(persons.concat(newContact))
      setNewName('')
      setNewNumber('')
      setMessage({
        text: `Added ${newPerson.name} [${newPerson.number}]`,
        type: 'success'
      })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({
        text: error.response.data.error,
        type: 'error'
      })
      setTimeout(() => setMessage(null), 5000)
    }
  };

  const onDelete = async (id) => {
    const contact = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${contact.name} [${contact.number}] ?`)) return

    const updatedPersons = persons.filter(p => p.id != id)
    setPersons(updatedPersons)
    try {
      const deleteContact = await personServices.deleteContact(id)
      setMessage({
        text: deleteContact.message,
        type: 'success'
      })
      setTimeout(() => setMessage(null), 5000)
    }
    catch {
      setMessage({
        text: `${contact.name} [${contact.number}] has already been deleted.`,
        type: 'error'
      })
      setTimeout(() => setMessage(null), 5000);
    }
  }

  return (
    <>
      <Notification message={message} />
      <div className="box">
        <h2 className="heading">Phonebook</h2>
        <Filter
          search={search}
          setSearch={setSearch}
        />

        <h2 className="heading">Add a new</h2>
        <PersonForm
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
          onAdd={onAdd}
        />

        <h2 className="heading">Numbers</h2>
        <table>
          <Persons
            search={search}
            persons={persons}
            onDelete={onDelete}
          />
        </table>
      </div>
    </>
  );
};

export default App;
