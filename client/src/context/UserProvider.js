import { createContext, useState, useEffect, useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"

const MEETING_URL = "/meeting"
const COMPANIES_URL = "/companies"
const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const { auth } = useAuth()
    const [meetingList, setMeetingList] = useState([])
    const [companyList, setCompanyList] = useState({})
    const axiosPrivate = useAxiosPrivate()
    
    //Get meeting data based on current user
    const getMeetingData = useCallback( async () => {
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
            setMeetingList({ meetingData })
        } catch (err) { 
            if (err.response) {
                console.error(err)
            } 
        }
    }, [auth, axiosPrivate])

    //Get company data including Company Name, EIRs, Status, Program, etc.
    const getCompanyList = useCallback (async () => {
        try{
            const response = await axiosPrivate.get(
                COMPANIES_URL,
                JSON.stringify({"userName":auth.userName})
            )
            
            setCompanyList(response?.data?.companyArr)
        } catch(err) {
            if (err) {console.error(err)}
        }
    }, [auth.userName, axiosPrivate])

    //Post new meeting submitted through AddHourModal component
    const addMeeting =  async (data) => {
        try{ 
            await axiosPrivate.post(
                MEETING_URL,
                JSON.stringify({"userId": auth.id, "data": data}),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
        } catch (err) {
            console.error(err)
        }
        setTimeout( () => {
            getMeetingData()
        }, "750")
    }

    //Delete selected meeting
    const deleteMeeting = async (records) => { 
        try{
                await axiosPrivate.delete(
                MEETING_URL, 
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
            getMeetingData()
        }, "750")
    }


    //Render Meeting and Company data on load
    useEffect( () => { 
        getMeetingData()
        getCompanyList()
    },[getMeetingData, getCompanyList])

    return (
        <UserContext.Provider value ={{ meetingList, companyList, addMeeting, deleteMeeting }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext