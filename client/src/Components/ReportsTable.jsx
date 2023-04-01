import { useMemo, useEffect } from 'react'

function ReportsTable({ data, currentMonth, hourType, setTotal, setFilteredHours }) {
    
    const filteredHours = useMemo(() => {
        return data?.filter(item => {
          const dateMonth = new Date(item.Date).getMonth()
          const isMatchingMonth = dateMonth === Number(currentMonth)
          const isCoachingMeeting = item.MeetingType.toLowerCase() === hourType
          return isMatchingMonth && isCoachingMeeting
        });
    }, [data, currentMonth, hourType])

    useEffect(() => {
        setTotal && setTotal(filteredHours?.reduce((acc, item) => acc + item.Duration, 0))
        setFilteredHours && setFilteredHours(filteredHours)
    }, [filteredHours, setTotal, setFilteredHours])
    
    return(
        <table id={`${hourType}-table`}>
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Duration</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredHours && filteredHours.map( row => { 
                        return(
                            <tr>
                                <td>{row.CompanyName}</td>
                                <td>{row.Duration}</td>
                                <td>{row.Date}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default ReportsTable