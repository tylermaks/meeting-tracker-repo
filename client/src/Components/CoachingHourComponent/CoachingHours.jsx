import { useState } from 'react'
import useUser from "../../hooks/useUser"
import CoachingHoursTable from './CoachingHoursTable'
import AddHoursModal from "./AddHoursModal"
import TrashIcon from "../../Images/trash-solid.svg"
import "../../Styles/HoursTable.scss"


function CoachingHours() {
    const { deleteMeeting } = useUser()
    const [modal, setModal] = useState(false)
    const [checkedRows, setCheckedRows] = useState([])

    const handleClick = () => {
        setModal(!modal)
    }

    const handleDeleteMeetings = () => {
        deleteMeeting(checkedRows)
        setCheckedRows([])
    }

    return(
        <section id="hours">
            {modal ? <AddHoursModal handleClick={handleClick} setModal={setModal}/> : null}
            <div className="flex-row flex-row--right">
                <img
                    className={checkedRows.length === 0 ? "hidden" : "delete-records icon icon--md" } 
                    src= {TrashIcon}
                    alt="Delete Selected Rows"
                    onClick = {handleDeleteMeetings} 
                />
                <div onClick={handleClick} className="btn btn--primary">
                    Add Hours
                </div>
            </div>
            <CoachingHoursTable 
                checkedRows={checkedRows}
                setCheckedRows={setCheckedRows}
            />
        </section>
    )
}

export default CoachingHours;