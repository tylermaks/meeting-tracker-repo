import useAppData from "../../hooks/useAppData";
import useAuth from "../../hooks/useAuth"
import CompanyCard from "./CompanyCard";
import SupportRequests from "./SupportRequests";
import "../../Styles/Companies/Companies.scss"

function Companies() {
    const { companyList } = useAppData()
    const { auth } = useAuth()
    const filteredCompanies = companyList?.filter( company => company.idLeadEIR.toString() === auth.userName) //provides only the companies working with user

    return(
        <section id="companies">
            <h2>Your Companies</h2>
            <div className="card-grid">
                {
                    filteredCompanies?.map((item, i) => { 
                        return(
                            <CompanyCard 
                                key={i}
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