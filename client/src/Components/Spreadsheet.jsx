import SpreadsheetRow from "./SpreadsheetRow";
import "../Styles/Spreadsheet.scss"

function Spreadsheet (){ 
    const colHeaders = ["Company Name", "Date", "Meeting Type", "Duartion", "Notes"]

    return(
        <section>
            <div className="spreadsheet-row spreadsheet-row--header">
                {
                    colHeaders.map((col, i) => {
                        return(
                            <p key={i}>{col}</p>
                        )
                    })
                }
            </div>
            <>
                {/* {
                    meetingArr.map( (meeting, i) => {
                        return(
                            <SpreadsheetRow key={i} data={{meeting}} />
                        ) 
                    })
                } */}
            </>


        </section>
    )
}

export default Spreadsheet;