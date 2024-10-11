const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, onAdd }) => {
    return (
        <form>
            <table>
                <tbody>
                    <tr>
                        <td>name:</td>
                        <td> <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        /></td>
                    </tr>
                    <tr>
                        <td>number:</td>
                        <td> <input
                            type="text"
                            value={newNumber}
                            onChange={(e) => setNewNumber(e.target.value)}
                        /></td>
                    </tr>
                    <tr>
                        <td><button
                            type="submit"
                            onClick={onAdd}
                        >
                            add
                        </button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default PersonForm