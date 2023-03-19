import { useState } from 'react'
import Spreadsheet from "./Spreadsheet"
import HoursModal from "./HoursModal"
import Trash from "../Images/trash-solid.svg"
import "../Styles/HoursTable.scss"


function Hours() {
    const [modal, setModal] = useState(false)
    const [checkedRows, setCheckedRows] = useState([])

    const handleClick = () => {
        setModal(!modal)
    }
 
    return(
        <section>
            {modal ? <HoursModal handleClick={handleClick} setModal={setModal}/> : null}
            <div className="flex-row flex-row--right">
                <img 
                    className={checkedRows.length === 0 ? "hidden" : "icon icon--md" } 
                    src={Trash} 
                    alt="" 
                />
                <div onClick={handleClick} className="btn-alt">
                    Add Hours
                </div>
            </div>
            <Spreadsheet 
                checkedRows={checkedRows}
                setRows={setCheckedRows}
            />
        </section>
    )
}

export default Hours;