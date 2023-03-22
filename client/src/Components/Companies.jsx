import "../Styles/Companies.scss"

function Companies() {

    return(
        <section id="companies">
            <h2 className="title">Your Companies</h2>
            <div id="user-companies" className="company-grid">
                <div className="company-card">
                    <div className="inner-card flex-column flex-column--center"> 
                        <h3>ABC Inc</h3>
                        <div className="circle">
                            <h2>5</h2>
                            <p>Coaching hours remain</p>
                        </div>
                    </div>
                    <div className="cma-container">
                        <h3>CMA Summary</h3>
                        <div className="cma flex-row flex-row--space">
                            <p>Market</p>
                            <p>3</p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="title">Browse Companies</h2>
            <div id="browse-companies" className="company-grid">



            </div>
        </section>
    )
}

export default Companies;