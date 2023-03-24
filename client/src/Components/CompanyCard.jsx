import "../Styles/Companies.scss"

function CompanyCard(){
    return(
        <div className="company-card">
            <div className="company-info">
                <div>
                    <h3>Company ABC</h3>
                    <p className="program">Launch & Deliver</p>
                </div>
                <div className="status">
                    <p>Active</p>
                </div>
            </div>
            {/* <div className="flex-column flex-column--center">
                <h2>5</h2>
                <p>Coaching Hours</p>
            </div> */}
        </div>
    )
}

export default CompanyCard