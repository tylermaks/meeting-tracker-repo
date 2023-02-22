import { useState } from 'react'
import AddHoursForm from './AddHoursForm'
import exit from '../Images/xmark-solid.svg'
import add from '../Images/circle-plus-solid.svg'
import '../Styles/HoursModal.scss'

function HoursModal({ handleClick }){
    
    const [forms, setForms] = useState([{}])

    const handleAddForm = () => {
        setForms(prev => [...prev, {}])
    }

    return(
        <section className="modal flex-row flex-row--center">
            <div className='hours-form'>
                <img onClick={handleClick} className="exit icon icon--md" src={exit} alt="Exit Add Hours Modal" />
                <h2>Add Coaching Hour</h2>
                <form>
                    {
                        forms.map( i => {
                            return(
                                <AddHoursForm key={i} />
                            )
                        })
                    }
                </form>

                <div onClick={handleAddForm} className='add-meeting flex-row'>
                    <img className="icon icon--small" src={add} alt="Add Meeting" />
                    <p>Add Another Meeting</p>
                </div>
            </div>
        </section>
    )
}

export default HoursModal