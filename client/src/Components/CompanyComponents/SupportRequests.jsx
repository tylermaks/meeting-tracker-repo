import useAppData from "../../hooks/useAppData"
import CompanyCard from './CompanyCard';

function SupportRequests(){
    const { supportRequestList } = useAppData()

    return(
        <section id="browse-companies" className="company-grid">
            {
                supportRequestList && supportRequestList.map( (request, i) => { 
                    return(
                        <CompanyCard
                            key={i}
                            company={request.companyName}
                            program={request.currentProgram}
                            status={request.Status}
                            request={request.Request}
                        />
                    )
                })
            }
        </section>
    )
}

export default SupportRequests