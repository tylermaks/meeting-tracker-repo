import useUser from "../hooks/useUser"
import "../Styles/Spreadsheet.scss"

function Spreadsheet (){ 
    const { user } = useUser()

    return(
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
                    {/* RETURN TO CLEAN THIS UP */}
                    {   
                        user.meetingData
                        ? user.meetingData.map( (row, id) => {
                            return(
                                <tr key={id}>
                                    <td>{row.CompanyName}</td>
                                    <td>{row.Date}</td>
                                    <td>{row.Duration}</td>
                                    <td>{row.MeetingType}</td>
                                    <td>{row.Notes}</td>
                                </tr>
                            )
                        })
                        : <p>Hmm....something went wrong</p>
                    }
                </tbody>
            </table>
    )
}

export default Spreadsheet;