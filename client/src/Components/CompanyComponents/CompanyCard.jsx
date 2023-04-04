import "../../Styles/Companies.scss"

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
        <div className="company-card"> 
            <div> 
                <div className="company-info">
                    <div>
                        <h3>{company}</h3>
                        <p className="program">{program}</p>
                    </div>
                    <div className={statusColour()}>
                        <p>{status}</p>
                    </div>
                </div>
                {
                    request && 
                        <div class="flex-column flex-column--space">
                            <div className="support-request">
                                <p className="request-header">Support request:</p>
                                <p className="request-text">"{request}"</p>
                            </div>
                            <div class="flex-row flex-row--center card-btn">
                                <span>Connect</span>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default CompanyCard