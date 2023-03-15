import { useState, useEffect, useMemo } from 'react'
import useUser from "../hooks/useUser"
import TableHeader from './TablerHeader'
import "../Styles/Spreadsheet.scss"

function Spreadsheet ({ userData }){ 
    const { user } = useUser()
    const [rows, setRows] = useState([])
    const [filterData, setFilterData] = useState([])

    const filteredRows = useMemo(() => {
        return rows?.filter( item => {
            return Object.values(item).every(val => {
                return !filterData.includes(val)
            })
        })
    }, [rows, filterData])

    useEffect(() => {
        setRows(user.meetingData)
    },[user])

    useEffect(() => {
        console.log(filterData)
    }, [filterData])


    // const filteredRows = rows.filter(row => {
    //     // Check if the item's name and gender match any object in filterArray
    //     return filterData.some(filterItem => {
    //       return row.CompanyName === filterItem.name && item.gender === filterItem.gender;
    //     });
    //   });


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
                                filterData={filterData}
                                setFilterData={setFilterData}
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