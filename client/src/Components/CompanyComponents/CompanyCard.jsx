import "../../Styles/Companies/CompanyCard.scss"

function CompanyCard({ company, program, status, request }){

    //Set colour for status 
    const statusColour = () => { 
        if (status === "Active" || status === "Open"){
            return "status status--green"
        } else {
            return " status status--orange"
        }
    }


    return(
        <div className="company-card dashboard"> 
            <div> 
                <div className="flex-row flex-row--space">
                    <div>
                        <h3>{company}</h3>
                        <p>{program}</p>
                    </div>
                    <div className={statusColour()}>
                        <p>{status}</p>
                    </div>
                </div>
                {
                    request && 
                        <div className="flex-column flex-column--space">
                            <div className="support-request flex-column gap--05">
                                <p>Support request:</p>
                                <p>"{request}"</p>
                            </div>
                            <div className="flex-row flex-row--center card-btn">
                                <span>Connect</span>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default CompanyCard