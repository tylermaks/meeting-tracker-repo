import { useState } from 'react'
import useUser from "../hooks/useUser"
import sort from "../Images/sort-solid.svg"
import "../Styles/Spreadsheet.scss"

function Spreadsheet (){ 
    const { user } = useUser()
    const [rows, setRows ] = useState(user.meetingData)
    const columnNames = ["Company Name", "Date", "Duration", "Meeting Type", "Notes"]

    // const handleClick = () => { 
    //     setRows(rows.sort())
    // }

    return(
        <table>
                <thead>
                    <tr>
                    {
                        columnNames.map( (col, id) => {
                            return(
                                <th id={id} key={id}>
                                    {col}
                                    <img 
                                        className="sort icon icon--small" 
                                        src={sort} 
                                        // onClick={handleClick}
                                        alt={`Sort ${col}`} 
                                    />
                                </th>
                            )
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {/* RETURN TO CLEAN THIS UP */}
                    {   
                        rows
                        ? rows.map( (row, id) => {
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