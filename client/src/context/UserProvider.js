import { createContext, useState, useEffect, useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"

const MEETING_URL = "/meeting"
const MEETING_LIST_URL = "/meetingList"
const COMPANIES_URL = "/companies"
const SUPPORT_REQUESTS = '/supportRequests'
const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const { auth } = useAuth()
    const [meetingList, setMeetingList] = useState([])
    const [companyList, setCompanyList] = useState({})
    const [supportRequestList, setSupportRequestList] = useState([])
    const axiosPrivate = useAxiosPrivate()

    //GET request for meeting data based on current user
    const getMeetingData = useCallback( async () => {
        try{
            const response = await axiosPrivate.post(
                MEETING_LIST_URL,
                JSON.stringify({"userName":auth.userName})
            )
            
            const meetingData = response?.data?.meetingArr.map( item => {
                const record = item.fields
                return(
                    {
                        record_ID: item.record_ID,
                        companyName: record.companyName.toString(),
                        companyNameId: record.companyNameId.toString(),
                        date: record.date,
                        duration: Number(record.duration),
                        meetingType: record.meetingType.toString(),
                        meeting_ID: record.meeting_ID,
                        notes: record.notes,
                        advisorLink: record.advisorLink.toString(),
                        email: record.email.toString()
                    }
                )
            })

            setMeetingList({ meetingData })
        } catch (error) { 
            if (error.response) {
                console.error(error)
                console.log("Failed to get meeting list")
            } 
        }
    }, [auth, axiosPrivate])


    //POST request for new meeting submitted through AddHourModal component
    const addMeeting =  async (data) => {
        try{ 
            await axiosPrivate.post(
                MEETING_URL,
                JSON.stringify({"userId": auth.id, "data": data}),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
        } catch (error) {
            console.error(error)
            console.log("Failed to add meeting to database")
        }
        setTimeout( () => {
            getMeetingData()
        }, "750")
    }

    //GET request for company data including Company Name, EIRs, Status, Program, etc.
    const getCompanyList = useCallback (async () => {
        try{
            const response = await axiosPrivate.get(COMPANIES_URL)
            setCompanyList(response?.data?.companyArr)
        } catch(error) {
            console.error(error)
            console.log("Failed to get company list")
        }
    }, [axiosPrivate])

    //Send get request to retreive Support Request Data
    const getSupportRequests = useCallback (async () => {
        try{   
            const response = await axiosPrivate.get(
                SUPPORT_REQUESTS
            )
            setSupportRequestList(response?.data?.requestArr)
        } catch (err) {
            console.error(err)
            console.log("Unable to loag support request")
        }
    }, [axiosPrivate])

    //Delete selected meeting
    const deleteMeeting = async (records) => { 
        try{
                await axiosPrivate.delete(
                MEETING_URL, 
                {
                    data: records
                }
            )

        } catch(error) {
            console.error(error)
            console.log("Failed to delete meeting to database")
        }
        setTimeout( () => {
            getMeetingData()
        }, "750")
    }


    //Render Meeting and Company data on load
    useEffect( () => { 
        getSupportRequests()
        getMeetingData()
        getCompanyList()
    },[getMeetingData, getCompanyList, getSupportRequests])

    return (
        <UserContext.Provider value ={{ meetingList, companyList, supportRequestList, addMeeting, deleteMeeting }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext