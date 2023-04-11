import { useMemo, useEffect } from 'react'

function ReportsTable({ data, currentMonth, hourType, setTotal }) {

    const filteredHours = useMemo(() => {
        //Filter data by month 
        const filteredData = data?.filter(item => {
            const dateMonth = new Date(item.date + ' PST').getMonth()
            const isMatchingMonth = dateMonth === Number(currentMonth)
            const isCoachingMeeting = item.meetingType === hourType
            return isMatchingMonth && isCoachingMeeting
        });

        // Sort the filtered data by date
        filteredData?.sort((a, b) => new Date(a.Date + ' PST') - new Date(b.Date + ' PST'));
        return filteredData;

    }, [data, currentMonth, hourType])

    //Send total data to Reports Component 
    useEffect(() => {
        setTotal && setTotal(filteredHours?.reduce((acc, item) => acc + item.duration, 0))
    }, [filteredHours, setTotal])
    
    return(
        <table id={`${hourType.toLowerCase()}-table`}>
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Duration</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredHours && filteredHours.map( (row, i) => { 
                        return(
                            <tr key={i}>
                                <td>{row.companyName}</td>
                                <td>{row.duration}</td>
                                <td>{row.date}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default ReportsTable