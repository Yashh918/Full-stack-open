const Persons = ({ search, persons, onDelete }) => {
    const filteredPersons = search
        ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()) || person.number.includes(search))
        : persons

    return (
        <tbody>
            {
                filteredPersons.map((person, key) =>
                    <tr key={person.number}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td><button onClick={() => onDelete(person.id)}>delete</button></td>
                    </tr>
                )
            }
        </tbody>
    )
}

export default Persons