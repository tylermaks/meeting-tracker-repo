import { useState, useEffect, useRef } from 'react'
import useUser from "../../hooks/useUser"
import sort from "../../Images/sort-solid.svg"
import check from "../../Images/check-solid.svg"
import "../../Styles/HoursTable.scss"

function TableHeader ({ label, id, rows, setRows, filterItems, setFilterItems }){
    const { user } = useUser()
    const [dropdown, setDropdown ] = useState(false)
    const [meetingData, setMeetingData] = useState([])
    const uniqueValues = [...new Set(meetingData?.map(item => item[id]))]
    const dropdownRef = useRef(null)
    const innerRef = useRef(null)
    
    useEffect(() => {
        document.getElementById("home").addEventListener("click", toggleDropdown)
        setMeetingData(user.meetingData)
    },[user])

    const toggleDropdown = (e) => { 
        (
            dropdownRef.current && 
            !dropdownRef.current.contains(e.target) &&
            !innerRef.current.contains(e.target)
        ) 
            ? setDropdown(false)
            : setDropdown(true)
    }

    const sortRows = (col, dir) => {
        const sortedData = [...rows].sort((a, b) => 
           dir === 'ascending'
            ? a[col] > b[col] ? 1 : -1 
            : a[col] < b[col] ? 1 : -1 
        )
        setRows(sortedData)
    }

    const toggleFilterItem = (item) => { 
        filterItems.includes(item)
            ? setFilterItems(filterItems.filter((i) => i !== item))
            : setFilterItems([...filterItems, item])
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
            <div ref={innerRef} className={dropdown ? "filter-dropdown flex-column" : "hidden"}>
                <span onClick={() => sortRows(id, 'ascending')}>Sort A - Z</span>
                <span onClick={() => sortRows(id, 'descending')}>Sort Z - A</span>
                <span>Filter</span>
                {
                    uniqueValues.map( (item, i) => {
                        return(
                            <div id={item} key={i} onClick={() => toggleFilterItem(item)} className="flex-row"> 
                                <img 
                                    className={filterItems.includes(item) ? "hidden-checkmark icon icon--small" : "icon icon--small" }
                                    src={check} 
                                    alt="Filter Item Selected" 
                                />
                                <p id={item}>{item}</p>
                            </div>
                        )
                    })
                }
            </div>
        </th>
  
    )
}


export default TableHeader