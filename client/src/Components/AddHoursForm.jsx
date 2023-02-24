import { useState } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"
const MEETINGS = "/meeting"

function AddHoursForm({ setModal }) {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const [companyName, setCompanyName] = useState('')
    const [date, setDate] = useState('')
    const [duration, setDuration] =useState('')
    const [notes, setNotes] = useState('')

    const meetingData = {
        id: auth.id,
        company: companyName,
        date: date,
        type: 'Coaching',
        duration: Number(duration),
        notes: notes
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axiosPrivate.post(
                MEETINGS,
                JSON.stringify(meetingData),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
            
            if (response.status === 204){
                setCompanyName('')
                setDate('')
                setDuration('')
                setNotes('')
                setModal(false)
            }
        } catch (err) {
            console.log(err.response.status)
        }
    }


    return(
        <form className="flex-col" onSubmit={handleSubmit}>
            <div className="inner-form">
                <label htmlFor="company-name">Company Name</label>
                <select 
                    name="company-name" 
                    id="company-name" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                >
                    <option value="ABC Inc">ABC Inc</option>
                    <option value="123 Corp">123 Corp</option>
                    <option value="HQ">HQ</option>
                </select>
                <div className='flex-row flex-row--space'>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input 
                            id="date" 
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)} 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="duration">Duration (Hrs)</label>
                        <input 
                            type="number" 
                            name="duration" 
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}  
                            required
                        />
                    </div>
                </div>
                
                <label htmlFor="notes">Notes</label>
                <textarea 
                    name="notes" 
                    id="notes" 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}  
                    required
                >
                </textarea>
                <button>Submit</button>
            </div>
        </form>
    )
}

export default AddHoursForm