import useUser from "../hooks/useUser"


function HoursTable({ data, setModal }) {
    const { addMeeting } = useUser()
    const handleSubmit = (e) => {
        e.preventDefault()
        addMeeting(data)
        setModal(false)
    }

    return(
        <form onSubmit={handleSubmit}>
            <h3>Hours Preview</h3>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Date</th>
                        <th>Duration (Hrs)</th>
                        <th>Meeting Type</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map( row => {
                            return(
                                <tr>
                                    <td>{row.company}</td>
                                    <td>{row.date}</td>
                                    <td>{row.duration}</td>
                                    <td>{row.meetingType}</td>
                                    <td>{row.notes}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button>Submit</button>
        </form>
    )
}

export default HoursTable