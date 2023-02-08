function SpreadsheetRow({ row }) {
    return(
        <div className="spreadsheet-row spreadsheet-row--meeting">
            <p>{row.Company}</p>
            <p>{row.Date}</p>
            <p>{row.MeetingType}</p>
            <p>{row.Duration}</p>
            <p>{row.Notes}</p>
        </div>
    )     
}

export default SpreadsheetRow;