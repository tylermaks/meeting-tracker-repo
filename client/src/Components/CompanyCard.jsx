import "../Styles/Companies.scss"

function CompanyCard(){
    return(
        <div className="company-card">
            <div className="inner-card flex-column flex-column--center"> 
                <div>
                    <h3>ABC Inc</h3>
                    <p>Launch & Deliver - Active</p>
                </div>
              
                <div>
                    <div className="circle flex-column flex-column--center">
                        <h2>5</h2>
                    </div>
                    <span>Coaching Hours</span>
                </div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="cma-container">
                <h3>CMA Summary</h3>
                <div className="cma cma--team flex-row flex-row--space">
                    <p>Market</p>
                    <p>3</p>
                </div>
            </div>
        </div>
    )
}

export default CompanyCard