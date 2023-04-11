import { useState } from 'react'
import useAppData from "../../hooks/useAppData"
import "../../Styles/CoachingHours/AddHoursForm.scss"

function AddHoursForm({ setAddHoursModal }) {
    const { addMeeting, companyList } = useAppData()
    const [companyName, setCompanyName] = useState('')
    const [date, setDate] = useState('')
    const [duration, setDuration] = useState('')
    const [meetingType, setMeetingType] = useState('Coaching')
    const [notes, setNotes] = useState('')
    const [button, setButton] = useState('')
    
    const meetingData = {
        company: companyName,
        date: date,
        meetingType: meetingType,
        duration: Number(duration),
        notes: notes
    }

    //Send meeting meetingData to backend through the addMeeting hook, then reset form inputs
    //If the user hits submit, close modal - if user hits Add Another Meeting keep modal open 
    const handleSubmit = (e) => {
        e.preventDefault()
        addMeeting([meetingData])
        setCompanyName('')
        setDate('')
        setDuration('')
        setNotes('')
        button === 'submit' && setAddHoursModal(false)
    }


    return(
        <form onSubmit={handleSubmit}>
            <div className="inner-form">
                <label htmlFor="company-name">Company Name</label>
                <select 
                    name="company-name" 
                    id="company-name" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                >
                    <option value="" disabled selected>Select Company</option>
                    {
                        companyList && companyList?.map( (company, i) => { 
                            return(
                                <option key={i} value={company.companyName}>{company.companyName}</option>
                            )
                        })

                    }
             
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
                    id="form-notes" 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}  
                    required
                >
                </textarea>
                <button id="submit" className='btn btn--primary' onClick={(e) => setButton(e.target.id)}>Submit</button>
                <button className="btn btn--secondary" onClick={(e) => setButton(e.target.id)}>Add Another Meeting</button>
                
            </div>
        </form>
    )
}

export default AddHoursForm