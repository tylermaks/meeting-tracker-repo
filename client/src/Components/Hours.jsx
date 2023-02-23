import { useState } from 'react'
import Spreadsheet from "./Spreadsheet";
import HoursModal from "./HoursModal";

function Hours() {
    const [modal, setModal] = useState(false)

    const handleClick = () => {
        setModal(!modal)
    }
 
    return(
        <section>
            {modal ? <HoursModal handleClick={handleClick} setModal={setModal}/> : null}
            <div className="dash-header flex-row flex-row--space">
                <h2>Hours</h2>
                <div onClick={handleClick} className="btn-alt">
                    Add Hours
                </div>
            </div>
            <Spreadsheet />
        </section>
    )
}

export default Hours;