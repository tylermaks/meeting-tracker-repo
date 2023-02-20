import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SpreadsheetRow from "./SpreadsheetRow";
import "../Styles/Spreadsheet.scss"

function Spreadsheet (){ 
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [rows, setRowsData] = useState()
    const colHeaders = ["Company Name", "Date", "Meeting Type", "Duartion", "Notes"]

    useEffect( () => {
        const getData = async () => { 
            try{
                const response = await axiosPrivate.get(`/user/${auth.userName}`)
                const data = response?.data?.meetingArr
                setRowsData(data)
            } catch (error) { 
                if (error.repsonse) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else {
                    console.log(`Error: ${error.message}`)
                } 
            }
        } 

        getData()
    },[auth]) 

    return(
        <section>
            <div className="spreadsheet-row spreadsheet-row--header">
                {
                    colHeaders.map((col, i) => {
                        return(
                            <p key={i}>{col}</p>
                        )
                    })
                }
            </div>
            <>
                {
                    rows 
                        ? rows.map( (row, i) => { return(<SpreadsheetRow key={i} data={row} />)})
                        : <p>Loading...</p>
                }
            </>

        </section>
    )
}

export default Spreadsheet;