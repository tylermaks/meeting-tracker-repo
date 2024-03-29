import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth"

function Logout(){
    //Hooks
    const { setAuth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    //Send request to backend and reset Auth variable
    const handleLogout = async () => {
        try{
            const response = await axiosPrivate.get("/logout")
            if (response.status === 204) {
                setAuth({})
            }
        } catch (error) {
            console.error(error)
            console.log("Unable to logout")
        }
    }

    return(
        <div className="logout">
            <p onClick={handleLogout}>Logout</p>
        </div>
    )
}

export default Logout