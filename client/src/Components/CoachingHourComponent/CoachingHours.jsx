import { useState, useEffect } from 'react'
import useAppData from "../../hooks/useAppData"
import CoachingHoursTable from './CoachingHoursTable'
import AddHoursModal from "./AddHoursModal"
import AddHoursForm from './AddHoursForm'
import TrashIcon from "../../Images/trash-solid.svg"


function CoachingHours() {
    const { deleteMeeting } = useAppData()
    const [addHoursModal, setAddHoursModal] = useState(false)
    const [checkedRows, setCheckedRows] = useState([])
    const [screenSize, setScreenSize] = useState(window.innerWidth)

    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      };
    }, []);

    const isMobile = screenSize <= 991;

    //Open modal if button is clicked
    const handleAddMeetingClick = () => {
        setAddHoursModal(!addHoursModal)
    }

    //Delete the selected meeting(s) and clear checkedRows state
    const handleDeleteMeetings = () => {
        deleteMeeting(checkedRows)
        setCheckedRows([])
        //Reset checkboxes in DOM
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach( checkbox => checkbox.checked = false)
    }

    return(
        <section className="dashboard">
            { isMobile ? (
                <AddHoursForm />
            ) : (
                <>
                    {addHoursModal && <AddHoursModal handleClick={handleAddMeetingClick} setAddHoursModal={setAddHoursModal}/>}
                    <div className="flex-row flex-row--right gap--1">
                        <img
                            className={checkedRows.length === 0 ? "hidden" : "delete-records icon icon--md" } 
                            src= {TrashIcon}
                            alt="Delete Selected Rows"
                            onClick = {handleDeleteMeetings} 
                        />
                        <div onClick={handleAddMeetingClick} className="btn btn--primary">
                            Add Hours
                        </div>
                    </div>
                    <CoachingHoursTable 
                        checkedRows={checkedRows}
                        setCheckedRows={setCheckedRows}
                    />
                </>
            )}
        </section>
    )
}

export default CoachingHours;