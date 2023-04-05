import { useState } from 'react'
import AddHoursForm from './AddHoursForm'
import ImportCSV from './ImportCSV'
import exit from '../../Images/xmark-solid.svg'
import '../../Styles/HoursModal.scss'


function AddHoursModal({ handleClick, setAddHoursModal }){
    const [modalFormView, setModalFormView] = useState(true)

    //Switches between AddHoursForm component and ImportCSV component
    const handleModalView = () => { 
        setModalFormView(!modalFormView)
    }
   
    return(
        <section className="modal flex-row flex-row--center">
            <div className='hours-form'>
                <img onClick={handleClick} className="exit icon icon--md" src={exit} alt="Exit Add Hours Modal" />
                <div className='modal-header flex-row flex-row--space'>
                    <h2>Add Coaching Hour</h2>
                    <div className="btn btn--secondary" onClick={handleModalView}> 
                        { modalFormView ? "Upload CSV" : "Add Hours"}
                    </div>
                </div>
                    {
                        modalFormView
                            ? <AddHoursForm setModal={setAddHoursModal}/> 
                            : <ImportCSV setAddHoursModal={setAddHoursModal}/>
                    }
            </div>
        </section>
    )
}

export default AddHoursModal