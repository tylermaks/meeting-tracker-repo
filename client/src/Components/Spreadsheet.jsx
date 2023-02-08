import SpreadsheetRow from "./SpreadsheetRow";
import testData from "../testData";
import "../Styles/Spreadsheet.scss"

function Spreadsheet (){ 
    const colHeaders = ["Company Name", "Date", "Meeting Type", "Duartion", "Notes"]

    return(
        <section>
            <div className="spreadsheet-row spreadsheet-row--header">
                {
                    colHeaders.map(col => {
                        return(
                            <p>{col}</p>
                        )
                    })
                }
            </div>
            
            {
                testData.map(data => {
                    return(
                        <SpreadsheetRow row={data} />
                    )
                })
            }

        </section>
    )
}

export default Spreadsheet;