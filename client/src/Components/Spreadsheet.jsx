import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SpreadsheetRow from "./SpreadsheetRow";
import "../Styles/Spreadsheet.scss"

function Spreadsheet (){ 
    const [rows, setRowsData] = useState()
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
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
                    navigate("/", { state: {from: location}, replace: true})
                } 
            }
        } 

        getData()
    },[auth, axiosPrivate, location, navigate]) 

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