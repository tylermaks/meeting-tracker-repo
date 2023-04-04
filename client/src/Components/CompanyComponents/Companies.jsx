import useAppData from "../../hooks/useAppData";
import useAuth from "../../hooks/useAuth"
import CompanyCard from "./CompanyCard";
import SupportRequests from "./SupportRequests";
import "../../Styles/Companies.scss"

function Companies() {
    const { companyList } = useAppData()
    const { auth } = useAuth()
    const filteredCompanies = companyList?.filter( company => company.idLeadEIR.toString() === auth.userName)

    return(
        <section id="companies">
            <h2 className="title">Your Companies</h2>
            <div id="user-companies" className="company-grid">
                {
                    filteredCompanies?.map(item=> { 
                        return(
                            <CompanyCard 
                                key={item.id}
                                company={item.companyName}
                                program={item.CurrentProgram}
                                status={item.Status}
                            />
                        )
                    })
                }
            </div>
            <h2 className="title">Browse Support Requests</h2>
            <SupportRequests />
        </section>
    )
}

export default Companies;