function AddHoursForm() {
    return(
        <div>
            <label htmlFor="company-name">Company Name</label>
            <select name="company-name" id="company-name" required>
                <option value="ABC Inc">ABC Inc</option>
                <option value="123 Corp">123 Corp</option>
                <option value="HQ">HQ</option>
            </select>
            <div className='flex-row flex-row--space'>
                <div>
                    <label htmlFor="date">Date</label>
                    <input id="date" type="date" required/>
                </div>
                <div>
                    <label htmlFor="duration">Duration (Hrs)</label>
                    <input type="number" name="duration" id="duration" required/>
                </div>
            </div>
            
            <label htmlFor="notes">Notes</label>
            <textarea name="notes" id="notes" cols="30" rows="10" required></textarea>
        </div>
    )
}

export default AddHoursForm