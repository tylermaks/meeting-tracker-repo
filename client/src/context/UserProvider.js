import { createContext, useState, useEffect, useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"

const CSV_URL = "/csv"
const COMPANIES_URL = "/companies"

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const { auth } = useAuth()
    const [user, setUser] = useState([])
    const [companies, setCompanies] = useState({})
    const axiosPrivate = useAxiosPrivate()
    
    const getUserData = useCallback( async () => {
        try{
            const response = await axiosPrivate.get(
                `/user/${auth.userName}`
            )
            
            const meetingData = response?.data?.meetingArr.map( item => {
                const record = item.fields
                
                return(
                    {
                        record_ID: item.record_ID,
                        CompanyName: record.CompanyName.toString(),
                        CompanyNameId: record.CompanyNameId.toString(),
                        Date: record.Date,
                        Duration: Number(record.Duration),
                        MeetingType: record.MeetingType.toString(),
                        Meeting_ID: record.Meeting_ID,
                        Notes: record.Notes,
                        advisorLink: record.advisorLink.toString(),
                        email: record.email.toString()
                    }
                )
            })
            setUser({ meetingData })
        } catch (err) { 
            if (err.response) {
                console.error(err)
            } 
        }
    }, [auth, axiosPrivate])

    const getCompanyList = useCallback (async () => {
        try{
            const response = await axiosPrivate.get(
                COMPANIES_URL
            )
            setCompanies(response?.data?.companyArr)
        } catch(err) {
            if (err) {console.error(err)}
        }
    }, [axiosPrivate])

    const addMeeting =  async (data) => {
        try{ 
            await axiosPrivate.post(
                CSV_URL,
                JSON.stringify({"userId": auth.id, "data": data}),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
        } catch (err) {
            console.error(err)
        }
        setTimeout( () => {
            getUserData()
        }, "500")
    }

    const deleteMeeting = async (records) => { 
        try{
                await axiosPrivate.delete(
                CSV_URL, 
                {
                    data: records
                }
            )

        } catch(err) {
            if (err.response) {
                console.error(err)
            } 
        }
        setTimeout( () => {
            getUserData()
        }, "500")
    }

    useEffect( () => { 
        getUserData()
        getCompanyList()
    },[getUserData, getCompanyList])

    return (
        <UserContext.Provider value ={{ user, companies, addMeeting, deleteMeeting }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext