import { useState, useEffect } from 'react'
import useUser from "../hooks/useUser"
import ReportsTable from './ReportsTable'
import "../Styles/Reports.scss"

function Reports(){
    const { user } = useUser()
    const [rows, setRows] = useState([])
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [coachingHourTotal, setCoachingHourTotal] = useState(0)
    const [programHourTotal, setProgramHourTotal] = useState(0)
    const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    //set rows state on load
    useEffect(() => {
        setRows(user?.meetingData)
    },[user])
 
    return(
        <section className="dashboard">
            <div className="flex-row flex-row--space">
                <h2>Monthly Hour Report</h2>
                <div className='flex-row gap--15'>
                    <select 
                        name="months" 
                        id="months"
                        defaultValue={currentMonth}
                        onChange={(e) => setCurrentMonth(e.target.value)}
                    >
                        {
                            monthsArr.map((month, i) => { 
                                return(
                                    <option value={i}>{month}</option>
                                ) 
                            })
                        }
                    </select>
                    <div className="btn btn--primary">Export PDF</div>
                </div>
            </div>
            <div className='table-container flex-column gap--2'>
                <h3>{monthsArr[currentMonth] + " Report"}</h3>
                <div>
                    <p>Coaching Hours</p>
                    <ReportsTable 
                        data={rows}
                        currentMonth={currentMonth}
                        setTotal={setCoachingHourTotal}
                        hourType="Coaching"
                    /> 
                </div>
                <div>
                    <p>Program Hours</p>
                    <ReportsTable 
                        data={rows}
                        currentMonth={currentMonth}
                        setTotal={setProgramHourTotal}
                        hourType="Program"
                    /> 
                </div>

                <table className="total-table">
                    <tbody>
                        <tr>
                            <td className="row-header">Coaching Total</td>
                            <td className="row-data">{coachingHourTotal}</td>
                        </tr>
                        <tr>
                            <td className="row-header">Program Total</td>
                            <td className="row-data">{programHourTotal}</td>
                        </tr>
                        <tr>
                            <td className="row-header">Grand Total</td>
                            <td className="row-data">{coachingHourTotal + programHourTotal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Reports;