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
    personServices
      .getAllContacts()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const onAdd = (e) => {
    e.preventDefault()
    const cleanedName = newName.trim()
    const cleanedNumber = newNumber.trim();

    if (!cleanedName) {
      alert('Name cannot be empty')
      return
    }

    const phoneRegex = /^\+?(\d{1,3})?[-\s]?\d{10,15}$/
    if (!phoneRegex.test(cleanedNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const isDuplicateNumber = persons.some(person => person.number === cleanedNumber)
    const isDuplicateName = persons.some(person => person.name === cleanedName)

    if (isDuplicateNumber) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    if (isDuplicateName && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {
      const contact = persons.find(p => p.name === cleanedName)

      personServices
        .getContact(contact.id)
        .then(() => {
          const updatedContact = { ...contact, number: cleanedNumber }
          personServices
            .updateContact(contact.id, updatedContact)
            .then(data => {
              const updatedPersons = persons.filter(p => p.id !== contact.id)
              setPersons(updatedPersons.concat(data))
              setNewName('')
              setNewNumber('')
              setMessage({
                text: `${contact.name} was sucessfully updated from [${contact.number}] to [${updatedContact.number}]`,
                type: 'success'
              })
              setTimeout(() => setMessage(null), 5000)
            })
        })
        .catch(() => {
          const updatedPersons = persons.filter(p => p.id !== contact.id)
          setPersons(updatedPersons)
          setMessage({ 
            text: `${contact.name} has already been deleted.`, 
            type: 'error' 
          })
          setTimeout(() => setMessage(null), 5000)
        })

      return
    }

    const newPerson = {
      name: cleanedName,
      number: cleanedNumber
    }

    personServices
      .create(newPerson)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        setMessage({
          text: `Added ${newPerson.name} [${newPerson.number}]`,
          type: 'success'
        })
        setTimeout(() => setMessage(null), 5000)
      })
  };

  const onDelete = (id) => {
    const contact = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${contact.name} [${contact.number}] ?`)) {
      personServices
        .deleteContact(id)
        .then(data => {
          const updatedPersons = persons.filter(p => p.id !== id)
          setPersons(updatedPersons)
          setMessage(`Deleted ${data.name} [${data.number}]`)
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(err => {
          const updatedPersons = persons.filter(p => p.id !== id)
          setPersons(updatedPersons)
          setMessage({ 
            text: `${contact.name} has already been deleted.`, 
            type: 'error' 
          })
          setTimeout(() => setMessage(null), 5000);
        })
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
