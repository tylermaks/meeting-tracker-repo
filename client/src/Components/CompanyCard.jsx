import { useState } from 'react'
import "../Styles/Companies.scss"

function CompanyCard({ id, company, program, status, request }){
    const [clicked, setClicked] = useState("")

    //Set colour for status 
    const statusColour = () => { 
        if (status === "Active" || status === "Open"){
            return "status status--green"
        } else {
            return " status status--orange"
        }
    }

    const handleClick = (e) => { 
        setClicked('')
        setClicked(e.target.id)
    }


    return(
        <div 
            id={id}
            onClick={handleClick} 
            className={request ? "company-card company-card--pointer" : "company-card"}
        >
            {
                clicked === id
                    ? <div>
                        <p>Click Confirmed</p>
                    </div>
            
            
                    :<div> 
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
                            request
                                ? <div className="support-request">
                                    <p className="request-header">Support request:</p>
                                    <p className="request-text">"{request}"</p>
                                </div>
                                : null
                        }
                    </div>
            }
        </div>
    )
}

export default CompanyCard