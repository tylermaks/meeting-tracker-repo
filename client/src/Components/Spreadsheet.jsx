import { useState, useEffect, useMemo } from 'react'
import ReactPaginate from 'react-paginate';
import useUser from "../hooks/useUser"
import TableHeader from './TablerHeader'
import "../Styles/HoursTable.scss"

function Spreadsheet ({ checkedRows, setCheckedRows }){ 
    const { user } = useUser()
    const [rows, setRows] = useState([])
    const [filterItems, setFilterItems] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 10;

    const columnNames = [
        {id: "CompanyName", label:"Company Name"}, 
        {id: "Date", label:"Date"}, 
        {id: "Duration", label: "Duration"},
        {id: "MeetingType", label: "Meeting Type"},
        {id: "Notes", label:"Notes"}
    ]

    useEffect(() => {
        setRows(user?.meetingData)
    },[user])

    const filteredRows = useMemo(() => {
        const startIndex = pageNumber * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return rows
          ?.filter((item) => {
            return !Object.values(item).some((val) => filterItems.includes(val));
          })
          ?.slice(startIndex, endIndex);
      }, [rows, filterItems, pageNumber]);


    const handlePageChange = ({ selected }) => { 
        setPageNumber(selected)
    }

    const handleCheckbox = (id) => { 
        checkedRows.includes(id)
            ? setCheckedRows(checkedRows.filter(i => i !== id))
            : setCheckedRows([...checkedRows, id])
    }

    return(
        <>
        <table>
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" />
                    </th>
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
                            />
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {   
                    filteredRows?.map((row, id) => {
                        return(
                            <tr key={id}>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name={id}
                                        onChange={() => handleCheckbox(row.record_ID)}
                                    />
                                </td>
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
            <ReactPaginate
                pageCount={Math.ceil(rows?.length / itemsPerPage)}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName={'page-item'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
            />
            

        </>
    )
}

export default Spreadsheet;