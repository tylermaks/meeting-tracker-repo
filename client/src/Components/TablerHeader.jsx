import { useState, useEffect, useRef } from 'react'
import useUser from "../hooks/useUser"
import sort from "../Images/sort-solid.svg"
import check from "../Images/check-solid.svg"
import "../Styles/FilterSpreadsheet.scss"

function TableHeader ({ label, id, rows, setRows, filterData, setFilterData }){
    const { user } = useUser()
    const [dropdown, setDropdown ] = useState('')
    const [list, setList] = useState([])
    const uniqueValues = [...new Set(list?.map(item => item[id]))]
    const dropdownRef = useRef(null)
    const innerRef = useRef(null)
    
    useEffect(() => {
        document.getElementById("home").addEventListener("click", toggleDropdown)
        setList(user.meetingData)
    },[user.meetingData])

    const toggleDropdown = (e) => { 
        console.log(e.target)
        (dropdownRef.current.contains(e.target) || innerRef.current.contains(e.target))
            ? setDropdown(e.target.id)
            : setDropdown('')
    }

    const handleFilter = (e) => { 
        const clicked = e.target.id
        setFilterData([...filterData, clicked])
    }

    const sortRows = (col, dir) => {
        const sortedData = [...rows].sort((a, b) => 
           dir === 'ascending'
            ? a[col] > b[col] ? 1 : -1 
            : a[col] < b[col] ? 1 : -1 
        )
        setRows(sortedData)
    }

    return(
        <th className="column-header">
            {label}
            <img
                id={id}
                className="sort icon icon--small" 
                ref={dropdownRef}
                src={sort} 
                alt={`Sort ${id}`} 
            />
            <div ref={innerRef} className={dropdown === id ? "filter-dropdown flex-column" : "hidden"}>
                <span onClick={() => sortRows(id, 'ascending')}>Sort A - Z</span>
                <span onClick={() => sortRows(id, 'descending')}>Sort Z - A</span>
                <span>Filter</span>
                {
                    uniqueValues.map( (item, i) => {
                        return(
                            <div id={item} key={i} onClick={handleFilter} className="flex-row"> 
                                <img className="icon icon--small" src={check} alt="Filter Item Selected" />
                                <p>{item}</p>
                            </div>
                        )
                    })
                }
            </div>
        </th>
  
    )
}


export default TableHeader