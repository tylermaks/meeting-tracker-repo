import { useState } from 'react'
import useUser from "../hooks/useUser"
import sort from "../Images/sort-solid.svg"
import "../Styles/Spreadsheet.scss"

function Spreadsheet (){ 
    const { user } = useUser()
    const data = user.meetingData
    const [ascending, setAscending] = useState(true)
    const [rows, setRows] = useState(data)

    const columnNames = [
        {key: "CompanyName", label:"Company Name"}, 
        {key: "Date", label:"Date"}, 
        {key: "Duration", label: "Duration"},
        {key: "MeetingType", label: "Meeting Type"},
        {key: "Notes", label:"Notes"}
    ]

    const handleSort = col => {
        const sortedData = [...rows].sort((a, b) => 
           ascending 
            ? a[col] > b[col] ? 1 : -1 
            : a[col] < b[col] ? 1 : -1 
        )
        setRows(sortedData)
        setAscending(!ascending)
    }

    
    return(
        <table>
            <thead>
                <tr>
                {
                    columnNames.map( col => {
                        return(
                            <th id={col.key} key={col.key}>
                                {col.label}
                                <img 
                                    className="sort icon icon--small" 
                                    src={sort} 
                                    onClick={() => handleSort(col.key)}
                                    alt={`Sort ${col.label}`} 
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