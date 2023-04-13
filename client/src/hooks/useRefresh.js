import axios from "../API/userData"
import useAuth from "./useAuth"

const useRefresh = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        //GET Requst for refesh token 
        const response = await axios.get('/refresh')
        console.log(response)
        const { accessToken, userName, roles, fName, lName } = response.data;
        setAuth({ roles, userName, fName, lName, accessToken });

        return response.data.accessToken
    }
    
    return refresh
}

export default useRefresh