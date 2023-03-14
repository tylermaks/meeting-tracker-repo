import { useState, useEffect } from 'react'
import useUser from "../hooks/useUser"
import TableHeader from './TablerHeader'
import "../Styles/Spreadsheet.scss"

function Spreadsheet (){ 
    const { user } = useUser()
    const [rows, setRows] = useState("")
    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        setRows(user.meetingData)
    },[user])

    // useEffect(() => {
    //     setRows(filter( item => !Object.values(item).some( val => filterData.includes(val))))
    // }, [filterData, rows, user])

    const columnNames = [
        {id: "CompanyName", label:"Company Name"}, 
        {id: "Date", label:"Date"}, 
        {id: "Duration", label: "Duration"},
        {id: "MeetingType", label: "Meeting Type"},
        {id: "Notes", label:"Notes"}
    ]

    return(
        <table>
            <thead>
                <tr>
                    {columnNames.map( (col, key) => {
                        return(
                            <TableHeader 
                                key={key}
                                id={col.id}
                                label={col.label}
                                rows={rows}
                                setRows={setRows}
                                filter={filterData}
                                setFilter={setFilterData}
                            />
                        )
                    })}
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