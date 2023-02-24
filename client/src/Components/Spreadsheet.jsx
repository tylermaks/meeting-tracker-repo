import { useState, useEffect } from "react"
import { useNavigate, useLocation} from "react-router-dom"
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
        let isMounted = true
        const controller = new AbortController()

        const getData = async () => { 
            try{
                const response = await axiosPrivate.get(
                    `/user/${auth.userName}`,
                    {signal: controller.signal}
                )
                const data = response?.data?.meetingArr
                isMounted && setRowsData(data)

            } catch (error) { 
                if (error?.response?.status === 403) {
                    navigate("/", {from: location}, {replace: true})
                } else if (error.response) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers) 
                } 
            }
        } 

        getData()

        return () => {
            isMounted = false
            controller.abort()
        }
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