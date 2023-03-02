import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"
const CSV_URL = '/csv'

function HoursTable({ data, setModal }) {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()


    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            const response = axiosPrivate.post(
                CSV_URL,
                JSON.stringify({ "userId": auth.id, "data": data}), 
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )

            console.log(response)
            setModal(false)
        } catch (err) {
            console.error(err)
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <h3>Hours Preview</h3>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Date</th>
                        <th>Duration (Hrs)</th>
                        <th>Meeting Type</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map( row => {
                            return(
                                <tr>
                                    <td>{row.companyName}</td>
                                    <td>{row.date}</td>
                                    <td>{row.duration}</td>
                                    <td>{row.meetingType}</td>
                                    <td>{row.notes}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button>Submit</button>
        </form>
    )
}

export default HoursTable