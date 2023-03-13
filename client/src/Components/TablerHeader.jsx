import { useState, useEffect, useRef } from 'react'
import useUser from "../hooks/useUser"
import sort from "../Images/sort-solid.svg"
import "../Styles/FilterSpreadsheet.scss"

function TableHeader ({ label, id, rows, filterData, setFilterData }){
    const { user } = useUser()
    const dropdownRef = useRef(null)
    const [dropdown, setDropdown ] = useState('')
    // const [filterData, setFilterData] = useState('')
    const [list, setList] = useState('')
    
    // setList([...new Set(user.meetingData.map( item => item[id]))].sort((a,b) => a > b ? 1 : -1))

    useEffect(() => {
        document.getElementById("home").addEventListener("click", toggleDropdown)
    },[])

    useEffect(() => {
        console.log(user.meetingData)
        setList([...new Set(user.meetingData.map( item => item[id]))].sort((a,b) => a > b ? 1 : -1))
    }, [user, id])

    const toggleDropdown = (e) => { 
        let clicked = dropdownRef.current.contains(e.target)
        !clicked ? setDropdown('') : setDropdown(e.target.id)
    }

    // const handleFilter = (e) => { 
    //     let clicked = e.target.id
    //     setFilterData([...filterData, clicked])
    //     // let things = rows.filter( item => Object.values(item).some( val => filterData.includes(val)))
    //     // console.log(things)
    // }



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
                    // list && list.map( (item, i) => {
                    //     return(
                    //         <p 
                    //             id={item}
                    //             key={i}
                    //             // onClick={handleFilter}
                    //         > 
                    //             {item} 
                    //         </p>
                    //     )
                    // })
                }
            </div>
        </th>
    )
}


export default TableHeader