import { useState } from 'react'

import useUser from "../hooks/useUser"
import Spreadsheet from "./Spreadsheet"
import HoursModal from "./HoursModal"
import TrashIcon from "../Images/trash-solid.svg"
import "../Styles/HoursTable.scss"


function Hours() {
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
        <section>
            {modal ? <HoursModal handleClick={handleClick} setModal={setModal}/> : null}
            <div className="flex-row flex-row--right">
                <img
                    className={checkedRows.length === 0 ? "hidden" : "delete-records icon icon--md" } 
                    src= {TrashIcon}
                    alt="Delete Selected Rows"
                    onClick = {handleDeleteMeetings} 
                />
                <div onClick={handleClick} className="btn-alt">
                    Add Hours
                </div>
            </div>
            <Spreadsheet 
                checkedRows={checkedRows}
                setCheckedRows={setCheckedRows}
            />
        </section>
    )
}

export default Hours;