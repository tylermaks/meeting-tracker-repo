import useAppData from "../../hooks/useAppData"

function ImportCSVTable({ csvTableData, setAddHoursModal }) {
    const { addMeeting } = useAppData()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        addMeeting(csvTableData)
        setAddHoursModal(false)
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
                        csvTableData?.map( (row, i) => {
                            return(
                                <tr key={i}>
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
            <button className="btn btn--primary">Submit</button>
        </form>
    )
}

export default ImportCSVTable