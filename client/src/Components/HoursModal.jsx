import exit from '../Images/xmark-solid.svg'
import '../Styles/HoursModal.scss'

function HoursModal({ handleClick }){
    return(
        <section className="modal flex-row flex-row--center">
            <div className='hours-form'>
                <img onClick={handleClick} className="icon icon--md" src={exit} alt="Exit Add Hours Modal" />
                <form>
                    <label htmlFor="date">Date</label>
                    <input id="date" type="date" required/>
                    <label htmlFor="company-name">Company Name</label>
                    <select name="company-name" id="company-name" required>
                        <option value="ABC Inc">ABC Inc</option>
                        <option value="123 Corp">123 Corp</option>
                        <option value="HQ">HQ</option>
                    </select>
                    <label htmlFor="duration">Duration</label>
                    <input type="number" name="duration" id="duration" required/>
                    <label htmlFor="notes">Notes</label>
                    <textarea name="notes" id="notes" cols="30" rows="10" required></textarea>
                </form>
            </div>
        </section>
    )
}

export default HoursModal