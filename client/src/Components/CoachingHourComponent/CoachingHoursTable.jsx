import { useState, useEffect, useMemo } from 'react'
import ReactPaginate from 'react-paginate';
import useAppData from "../../hooks/useAppData"
import CoachingHoursTableHeader from './CoachingHoursTableHeader'
import "../../Styles/HoursTable.scss"

function CoachingHoursTable ({ checkedRows, setCheckedRows }){ 
    const { meetingList } = useAppData()
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

    //Set rows state on load, and update if meetingList changes 
    useEffect(() => {
        setRows(meetingList?.meetingData)
    },[meetingList])

    //Paginate meeting rows while filtering rows (if necessary)
    const filteredRows = useMemo(() => {
        const startIndex = pageNumber * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return rows
          ?.filter((item) => {
            return !Object.values(item).some((val) => filterItems.includes(val));
          })
          ?.slice(startIndex, endIndex);
      }, [rows, filterItems, pageNumber]);

    //Advances the page in paginated component
    const handlePageChange = ({ selected }) => { 
        setPageNumber(selected)
    }

    //Adds selected checkbox to state in CoachingHours component -- used to identify rows to be deleted
    const addCheckboxToState = (id) => { 
        checkedRows.includes(id)
            ? setCheckedRows(checkedRows.filter(i => i !== id))
            : setCheckedRows([...checkedRows, id])
    }

    return(
        <>
        <table>
            <thead>
                <tr>
                    <th></th>
                    {columnNames.map( (col, key) => {
                        return(
                            <CoachingHoursTableHeader 
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
                                        className="table-checkbox"
                                        onChange={() => addCheckboxToState(row.record_ID)}
                                    />
                                </td>
                                <td>{row.companyName}</td>
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

export default CoachingHoursTable;