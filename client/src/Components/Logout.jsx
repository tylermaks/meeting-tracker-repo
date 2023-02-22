import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"

function Logout(){
    const { setAuth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const handleLogout = async () => {
        try{
            const response = await axiosPrivate.get("/logout")
            if (response.status === 204) {
                setAuth({})
            }

        } catch (error) {
            if (error.repsonse) {
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers) 
            } 
        }
    }

    return(
        <div className="logout">
            <p onClick={handleLogout}>Logout</p>
        </div>
    )
}

export default Logout