import axios from "../API/userData"
import useAuth from "./useAuth"

const useRefresh = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })

        const data = response.data.accessToken

        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log(data)
            return { ...prev, accessToken: data}
        })
        return data
    }
    
    return refresh
}

export default useRefresh