const Filter = ({ search, setSearch }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>filter:</td>
                    <td> <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    /></td>
                </tr>
            </tbody>
        </table>
    )
}

export default Filter