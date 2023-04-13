import axios from "../API/userData"
import useAuth from "./useAuth"

const useRefresh = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        //GET Requst for refesh token 
        try{
            const response = await axios.get('/refresh', {
                withCredentials: true
            })
    
            console.log(response)
            
            const { accessToken, userName, roles, fName, lName } = response.data;
            setAuth({ roles, userName, fName, lName, accessToken });
    
            return response.data.accessToken
        } catch(err) { 
            console.error(err)
        } 
    }
    
    return refresh
}

export default useRefresh