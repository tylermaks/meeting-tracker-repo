import useUser from "../hooks/useUser"
import CompanyCard from "./CompanyCard";
import "../Styles/Companies.scss"

function Companies() {
    const { companies } = useUser()

    return(
        <section id="companies">
            <h2 className="title">Your Companies</h2>
            <div id="user-companies" className="company-grid">
                {
                    companies?.map(item => { 
                        return(
                            <CompanyCard 
                                key={item}
                                company={item}
                            />
                        )
                    })
                }
            </div>
            <h2 className="title">Browse Support Requests</h2>
            <div id="browse-companies" className="company-grid">



            </div>
        </section>
    )
}

export default Companies;