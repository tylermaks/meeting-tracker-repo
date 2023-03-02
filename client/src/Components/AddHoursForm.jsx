import { useState } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"
const CSV_URL = "/csv"

function AddHoursForm({ setModal }) {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const [companyName, setCompanyName] = useState('')
    const [date, setDate] = useState('')
    const [duration, setDuration] = useState('')
    const [meetingType, setMeetingType] = useState('')
    const [notes, setNotes] = useState('')



    const handleSubmit = async (e) => {
        e.preventDefault()

        const convertDate = new Date(date)

        const meetingData = {
            company: companyName,
            date: `${convertDate.getMonth()}/${convertDate.getDate()}/${convertDate.getFullYear()}`,
            meetingType: meetingType,
            duration: Number(duration),
            notes: notes
        }


        try{
            const response = await axiosPrivate.post(
                CSV_URL,
                JSON.stringify({"userId": auth.id, "data": [meetingData]}),
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

                <div className='form-row flex-row flex-row--space'>
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
                        <label htmlFor="meetingType">Meeting Type</label>
                        <select 
                            name="meetingType" 
                            id="meeting-type" 
                            value={meetingType}
                            onChange={(e) => setMeetingType(e.target.value)}
                            required
                        >
                            <option value="Coaching">Coaching</option>
                            <option value="Program">Program</option>
                            <option value="Content Development">Content Development</option>
                            <option value="Other">Other</option>   

                        </select>
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