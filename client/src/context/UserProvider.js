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
    const [companyList, setCompanyList] = useState([])
    const [supportRequestList, setSupportRequestList] = useState([])
    const axiosPrivate = useAxiosPrivate()

     //GET request for company data including Company Name, EIRs, Status, Program, etc.
     const getCompanyList = useCallback (async () => {
        try{
            const response = await axiosPrivate.get(COMPANIES_URL)
            setCompanyList(response?.data?.companyArr)
<<<<<<< HEAD
=======
            console.log(response)
>>>>>>> a24592116f28e95a8fff783419e5f7463abd6120
        } catch(error) {
            console.error(error)
            console.log("Failed to get company list")
        }
    }, [axiosPrivate])

    //GET request for meeting data based on current user
    const getMeetingData = useCallback(async () => {
        try {
          const { data } = await axiosPrivate.post(MEETING_LIST_URL, {
            userName: auth.userName,
          });
      
          const meetingData = data?.meetingArr?.map(({ record_ID, fields: meetingRecord }) => ({
            record_ID,
            companyName: String(meetingRecord.companyName),
            companyNameId: String(meetingRecord.companyNameId),
            date: meetingRecord.date,
            duration: Number(meetingRecord.duration),
            meetingType: String(meetingRecord.meetingType),
            meeting_ID: meetingRecord.meeting_ID,
            notes: meetingRecord.notes,
            advisorLink: String(meetingRecord.advisorLink),
            email: String(meetingRecord.email),
          }));
      
          setMeetingList({ meetingData });
        } catch (error) {
          console.error(error);
          console.log("Failed to get meeting list");
        }
    }, [auth, axiosPrivate]);
      


    //POST request for new meeting submitted through AddHourModal component
    const addMeeting =  async (data) => {
        try{ 
            await axiosPrivate.post(MEETING_URL, JSON.stringify({
                "userId": auth.id, 
                "data": data
            }),{
                headers: {'Content-Type': 'application/json'}
            })
        } catch (error) {
            console.error(error)
            console.log("Failed to add meeting to database")
        }
        setTimeout( () => {
            getMeetingData()
        }, "750")
    }

   

    //Send get request to retreive Support Request Data
    const getSupportRequests = useCallback (async () => {
        try{   
            const response = await axiosPrivate.get(SUPPORT_REQUESTS)
            setSupportRequestList(response?.data?.requestArr)
        } catch (err) {
            console.error(err)
            console.log("Unable to load support request")
        }
    }, [axiosPrivate])

    //Delete selected meeting
    const deleteMeeting = async (records) => { 
        try{
            await axiosPrivate.delete(MEETING_URL, { data: records })

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
        getCompanyList()
        getMeetingData()
    },[getMeetingData, getCompanyList, getSupportRequests])

    return (
        <UserContext.Provider value ={{ meetingList, companyList, supportRequestList, addMeeting, deleteMeeting }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
