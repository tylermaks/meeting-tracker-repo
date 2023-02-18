function SpreadsheetRow({ data }) {
    return(
        <div className="spreadsheet-row spreadsheet-row--meeting">
            <p>{data.Company}</p>
            <p>{data.Date}</p>
            <p>{data.MeetingType}</p>
            <p>{data.Duration}</p>
            <p>{data.Notes}</p>
        </div>
    )     
}

export default SpreadsheetRow;