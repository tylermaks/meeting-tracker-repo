import CompanyCard from "./CompanyCard";
import "../Styles/Companies.scss"

function Companies() {

    return(
        <section id="companies">
            <h2 className="title">Your Companies</h2>
            <div id="user-companies" className="company-grid">
                <CompanyCard />
                <CompanyCard />
                <CompanyCard />
                <CompanyCard />
            </div>
            <h2 className="title">Browse Companies</h2>
            <div id="browse-companies" className="company-grid">



            </div>
        </section>
    )
}

export default Companies;