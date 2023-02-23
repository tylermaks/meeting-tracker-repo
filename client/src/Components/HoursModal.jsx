import { useState } from 'react'
import AddHoursForm from './AddHoursForm'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"
import exit from '../Images/xmark-solid.svg'
// import add from '../Images/circle-plus-solid.svg'
import '../Styles/HoursModal.scss'
const MEETINGS = "/meeting"

function HoursModal({ handleClick, setModal }){
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
        <section className="modal flex-row flex-row--center">
            <div className='hours-form'>
                <img onClick={handleClick} className="exit icon icon--md" src={exit} alt="Exit Add Hours Modal" />
                <h2>Add Coaching Hour</h2>
                <form className="flex-col" onSubmit={handleSubmit}>
                    <AddHoursForm 
                        companyName={companyName}
                        setCompanyName={setCompanyName}
                        date={date}
                        setDate={setDate}
                        duration={duration}
                        setDuration={setDuration}
                        notes={notes}
                        setNotes={setNotes}
                    />
                    <button>Submit</button>
                </form>

                {/* <div onClick={handleAddForm} className='add-meeting flex-row'>
                    <img className="icon icon--small" src={add} alt="Add Meeting" />
                    <p>Add Another Meeting</p>
                </div> */}
            </div>
        </section>
    )
}

export default HoursModal