import Spreadsheet from "./Spreadsheet";

function Hours() {
    return(
        <section>
            <div className="dash-header flex-row flex-row--space">
                <h2>Hours</h2>
                <div className="btn-alt">
                    Import CSV
                </div>
            </div>
            <Spreadsheet />
        </section>
    )
}

export default Hours;