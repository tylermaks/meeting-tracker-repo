import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation} from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"
const CSV_URL = "/csv"
const COMPANIES_URL = "/companies"

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const { auth } = useAuth()
    const [user, setUser] = useState({})
    const [companies, setCompanies] = useState({})
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    
    const addMeeting = async (data) => {
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

        getUserData()
    }

    const getUserData = useCallback( async () => {
        try{
            const response = await axiosPrivate.get(
                `/user/${auth.userName}`
            )
            const meetingData = response?.data?.meetingArr
       
            setUser({ meetingData })
        } catch (err) { 
            if (err?.response?.status === 403) {
                navigate("/", {from: location}, {replace: true})
            } else if (err.response) {
                console.error(err)
            } 
        }

    }, [auth.userName, axiosPrivate, location, navigate])


    useEffect( () => { 
        getUserData()
    },[getUserData])

    useEffect( () => {
        const getCompanyList = async () => {
            try{
                const response = await axiosPrivate.get(
                    COMPANIES_URL
                )
                setCompanies(response?.data?.companyArr)
            } catch(err) {
                if (err) {console.error(err)}
            }
        } 
        getCompanyList()
        getUserData()
    },[axiosPrivate, getUserData, auth.userName])


    return (
        <UserContext.Provider value ={{ user, addMeeting, companies }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext