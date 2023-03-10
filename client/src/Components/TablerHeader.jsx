import { useState, useEffect, useRef } from 'react'
import useUser from "../hooks/useUser"
import sort from "../Images/sort-solid.svg"
import "../Styles/FilterSpreadsheet.scss"

function TableHeader ({ label, id }){
    const { user } = useUser()
    const data = user.meetingData
    const dropdownRef = useRef(null)
    const [dropdown, setDropdown ] = useState('')
    

    useEffect(() => {
        document.addEventListener("click", toggleDropdown, true)
    },[])


    const toggleDropdown = (e) => { 
        let clicked = dropdownRef.current.contains(e.target)
        !clicked ? setDropdown('') : setDropdown(e.target.id)
    }

    // const handleSort = col => {
    //     const sortedData = [...rows].sort((a, b) => 
    //        ascending 
    //         ? a[col] > b[col] ? 1 : -1 
    //         : a[col] < b[col] ? 1 : -1 
    //     )
    //     setRows(sortedData)
    //     setAscending(!ascending)
    // }

    // const [ascending, setAscending] = useState(true)
    // onClick={() => handleSort(col.key)}


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
            <div className={dropdown === id ? "filter-dropdown flex-column" : "hidden"}>
                <p>Sort A - Z</p>
                <p>Sort Z - A</p>
                <p>Filter</p>
                {
                    data && data.map( (item, i) => {
                        return(
                            <p key={i}> {item[id]} </p>
                        )
                    })
                }
            </div>
        </th>
    )
}


export default TableHeader