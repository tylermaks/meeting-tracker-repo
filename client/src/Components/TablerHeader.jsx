import { useState, useEffect, useRef } from 'react'
import useUser from "../hooks/useUser"
import sort from "../Images/sort-solid.svg"
import "../Styles/FilterSpreadsheet.scss"

function TableHeader ({ label, id, filterData, setFilterData }){
    const { user } = useUser()
    const dropdownRef = useRef(null)
    const [dropdown, setDropdown ] = useState('')
    const [list, setList] = useState([])
    
    useEffect(() => {
        document.getElementById("home").addEventListener("click", toggleDropdown)
        setList(user.meetingData)
    },[user.meetingData])

    const uniqueValues = [...new Set(list?.map(item => item[id]))]

    const toggleDropdown = (e) => { 
        let clicked = dropdownRef.current.contains(e.target)
        !clicked ? setDropdown('') : setDropdown(e.target.id)
    }

    const handleFilter = (e) => { 
        const clicked = e.target.id
        setFilterData([...filterData, clicked])
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
                    uniqueValues.map( (item, i) => {
                        return(
                            <p 
                                id={item}
                                key={i}
                                onClick={handleFilter}
                            > 
                                {item} 
                            </p>
                        )

                    })
                }
            </div>
        </th>
  
    )
}


export default TableHeader