import { useState } from 'react'
import AddHoursForm from './AddHoursForm'
import ImportFile from './ImportFile'
import exit from '../Images/xmark-solid.svg'
import '../Styles/HoursModal.scss'


function HoursModal({ handleClick, setModal }){
    const [uploadType, setUploadType] = useState(true)

    const handleUploadType = () => { 
        setUploadType(!uploadType)
    }
   
    return(
        <section className="modal flex-row flex-row--center">
            <div className='hours-form'>
                <img onClick={handleClick} className="exit icon icon--md" src={exit} alt="Exit Add Hours Modal" />
                <div className='modal-header flex-row flex-row--space'>
                    <h2>Add Coaching Hour</h2>
                    <div className="btn-alt" onClick={handleUploadType}> 
                        { uploadType ? "Upload CSV" : "Add Hours"}
                    </div>
                </div>
                    {
                        uploadType 
                            ? <AddHoursForm setModal={setModal}/> 
                            : <ImportFile setModal={setModal}/>
                    }
            </div>
        </section>
    )
}

export default HoursModal