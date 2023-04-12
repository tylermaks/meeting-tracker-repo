import axios from "../API/userData"
import useAuth from "./useAuth"

const useRefresh = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        //GET Requst for refesh token 
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
               
        //Add the token to the authProvider 
        console.log(response.data.roles)
        console.log("working!")

        setAuth(prev => {
            return { 
                ...prev, 
                roles: response.data.roles,
                accessToken: response.data.accessToken}
        })
        return response.data.accessToken
    }
    
    return refresh
}

export default useRefresh