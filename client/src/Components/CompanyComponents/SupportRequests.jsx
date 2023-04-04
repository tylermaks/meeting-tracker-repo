import { useState, useEffect, useCallback } from 'react' 
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CompanyCard from './CompanyCard';

function SupportRequests(){
    const axiosPrivate = useAxiosPrivate()
    const SUPPORT_REQUESTS = '/supportRequests'

    const [supportRequests, setSupportRequests] = useState([])

    const getSupportRequests = useCallback (async () => {
        try{   
            const response = await axiosPrivate.get(
                SUPPORT_REQUESTS
            )
            setSupportRequests(response?.data?.requestArr)
        } catch (err) {
            if (err.response) {
                console.error(err)
            } 
        }
    }, [axiosPrivate])


    useEffect(() => {
        getSupportRequests()
    }, [getSupportRequests])


    return(
        <section id="browse-companies" className="company-grid">
            {
                supportRequests.map( (request, i) => { 
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