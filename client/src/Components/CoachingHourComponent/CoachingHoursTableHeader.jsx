import { useState, useEffect, useRef } from 'react'
import useAppData from "../../hooks/useAppData"
import sort from "../../Images/sort-solid.svg"
import check from "../../Images/check-solid.svg"
import "../../Styles/CoachingHours/CoachingHoursTableHeader.scss"

function CoachingHoursTableHeader ({ label, id, rows, setRows, filterItems, setFilterItems }){
    const { meetingList } = useAppData()
    const [dropdown, setDropdown ] = useState(false)
    const [dropdownData, setDropdownData] = useState([])
    const uniqueValues = [...new Set(dropdownData?.map(item => item[id]))]
    const dropdownRef = useRef(null)
    const innerRef = useRef(null)


    //Load and click event to detect if clickevent is outside of header dropdown
    //Set meetingData to be parsed into dropdown components
    useEffect(() => {
        document.getElementById("home").addEventListener("click", toggleDropdown)
        setDropdownData(meetingList?.meetingData)
    },[meetingList])

    //Toggle header dropdowns
    const toggleDropdown = (e) => { 
        (
            dropdownRef.current && 
            !dropdownRef.current.contains(e.target) &&
            !innerRef.current.contains(e.target)
        ) 
            ? setDropdown(false)
            : setDropdown(true)
    }

    //Sort rows from A -> Z and Z -> A
    const sortRows = (col, dir) => {
        const sortedData = [...rows].sort((a, b) => 
           dir === 'ascending'
            ? a[col] > b[col] ? 1 : -1 
            : a[col] < b[col] ? 1 : -1 
        )
        setRows(sortedData)
    }

    //Select items to include in the filterItems state array
    const toggleFilterItem = (item) => { 
        filterItems.includes(item)
            ? setFilterItems(filterItems.filter((i) => i !== item))
            : setFilterItems([...filterItems, item])
    }

    return(
        <th id={`${id}-header`}>
            <span>{label}</span>
            <img
                id={id}
                className="sort icon icon--small" 
                ref={dropdownRef}
                src={sort} 
                alt={`Sort ${id}`} 
            />
            <div ref={innerRef} className={dropdown ? "filter-dropdown dashboard flex-column gap--05" : "hidden"}>
                <p onClick={() => sortRows(id, 'ascending')}>Sort A - Z</p>
                <p onClick={() => sortRows(id, 'descending')}>Sort Z - A</p>
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


export default CoachingHoursTableHeader