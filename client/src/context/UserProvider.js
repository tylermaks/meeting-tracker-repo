import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"
const CSV_URL = "/csv"

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const { auth } = useAuth()
    const [user, setUser] = useState({})
    const [refreshKey, setRefreshKey] = useState(0)
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    const addMeeting = async (data) => {
        try{ 
            const response = await axiosPrivate.post(
                CSV_URL,
                JSON.stringify({"userId": auth.id, "data": [data]}),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
            
            setRefreshKey( oldKey => oldKey + 1)
            return response.status

        } catch (err) {
            console.error(err)
        }
    }

    useEffect( () => {
        let isMounted = true
        const controller = new AbortController()

        const getUserData = async () => { 
            try{
                const response = await axiosPrivate.get(
                    `/user/${auth.userName}`,
                    {signal: controller.signal}
                )
                const meetingData = response?.data?.meetingArr
                const companies = [] //coming soon! 

                isMounted && setUser({ meetingData, companies })
            } catch (error) { 
                //WHAT'S GOING ON HERE? RETURN TO CLEAN UP
                if (error?.response?.status === 403) {
                    navigate("/", {from: location}, {replace: true})
                } else if (error.response) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers) 
                } 
            }
        } 

        getUserData()
    },[auth.userName, axiosPrivate, location, navigate, refreshKey])


    return (
        <UserContext.Provider value ={{ user, setUser, addMeeting }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext