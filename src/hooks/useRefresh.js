import axios from "../API/userData"
import useAuth from "./useAuth"

const useRefresh = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        //GET Requst for refesh token 
        const response = await axios.get('/refresh', {
            withCredentials: true
        })

        const data = response.data.accessToken
        
        //Add the token to the authProvider 
        setAuth(prev => {
            return { ...prev, accessToken: data}
        })
        return data
    }
    
    return refresh
}

export default useRefresh