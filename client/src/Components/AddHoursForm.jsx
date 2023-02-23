function AddHoursForm({
    companyName,
    setCompanyName,
    date,
    setDate,
    duration,
    setDuration,
    notes,
    setNotes
}) {



    return(
        <div className="inner-form">
            <label htmlFor="company-name">Company Name</label>
            <select 
                name="company-name" 
                id="company-name" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
            >
                <option value="ABC Inc">ABC Inc</option>
                <option value="123 Corp">123 Corp</option>
                <option value="HQ">HQ</option>
            </select>
            <div className='flex-row flex-row--space'>
                <div>
                    <label htmlFor="date">Date</label>
                    <input 
                        id="date" 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="duration">Duration (Hrs)</label>
                    <input 
                        type="number" 
                        name="duration" 
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}  
                        required
                    />
                </div>
            </div>
            
            <label htmlFor="notes">Notes</label>
            <textarea 
                name="notes" 
                id="notes" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}  
                required
            >

            </textarea>
        </div>
    )
}

export default AddHoursForm