function SpreadsheetRow({ data }) {
    return(
        <div className="spreadsheet-row spreadsheet-row--meeting">
            <p>{data.CompanyName}</p>
            <p>{data.Date}</p>
            <p>{data.MeetingType}</p>
            <p>{data.Duration / 3600}</p>
            <p>{data.Notes}</p>
        </div>
    )     
}

export default SpreadsheetRow;