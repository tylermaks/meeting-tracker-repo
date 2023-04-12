import { axiosPrivate } from "../API/userData";
import { useEffect } from 'react'
import useRefresh from "./useRefresh";
import useAuth from "./useAuth";

const useAxiosPrivate = () =>{
    const refresh = useRefresh()
    const { auth } = useAuth()

    useEffect( () => {
        //Set Axios interceptor to create authorization header if one does not exist, includes access token from authProvider
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']){
                    config.headers['Authorization'] = `${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            //Handle 403 error codes by attempting to refresh access token and resending request with new token
            response => response,
            async (error) => {
                console.log(error)
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [auth, refresh])

    return axiosPrivate
}

export default useAxiosPrivate