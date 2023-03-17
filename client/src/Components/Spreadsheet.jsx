import { useState, useEffect, useMemo } from 'react'
import useUser from "../hooks/useUser"
import TableHeader from './TablerHeader'
import "../Styles/Spreadsheet.scss"

function Spreadsheet ({ userData }){ 
    const { user } = useUser()
    const [rows, setRows] = useState([])
    const [filterItems, setFilterItems] = useState([])

    const filteredRows = useMemo(() => {
        return rows?.filter((item) => {
          return !Object.values(item).some((val) => filterItems.includes(val));
        });
      }, [rows, filterItems]);

    useEffect(() => {
        setRows(user.meetingData)
        console.log(user.meetingData)
    },[user])

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
                                filterItems={filterItems}
                                setFilterItems={setFilterItems}
                                userData={userData}
                            />
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {/* RETURN TO CLEAN THIS UP */}
                {   
                    filteredRows?.map((row, id) => {
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
                }
            </tbody>
        </table>
    )
}

export default Spreadsheet;