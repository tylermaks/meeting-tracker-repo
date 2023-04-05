import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import axios from "../../API/userData"
const LOGIN_URL = '/auth'

function LoginForm(){
    //VARIABLES
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    //STATES
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    //Set error message if login fails
    useEffect(() => {
        setErrorMsg('')
    }, [userName, password])

    //Post request to backend to verify userName and Password
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(
                LOGIN_URL, 
                JSON.stringify({"email":userName, "pswd":password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
           
            const accessToken = response?.data?.accessToken
            const id = response?.data?.id
            const roles = response?.data?.roles
            const fName = response?.data?.fName
            const lName = response?.data?.lName


            setAuth({ id, roles, userName, fName, lName, accessToken })
            setUserName('')
            setPassword('')
            navigate("/home", { replace: true })

        } catch (error) {
            console.error(error.response.status)
            if(!error?.response){
                setErrorMsg('No Server Response')
            } else if (error?.reponse?.status === 400) { 
                setErrorMsg("Missing Username or Password")
            } else if (error?.reponse?.status === 401) {
                setErrorMsg("Username or Password is incorrect")
            } else { 
                setErrorMsg("Login Failed")
            }
        }
    }
  
    return(
        <form id="login-form" className="flex-column" onSubmit={handleSubmit}>
            <label htmlFor="email" className="offscreen">Email</label>
                <input 
                    id="email"
                    type="text" 
                    placeholder="Email"
                    required
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <label htmlFor="password" className="offscreen">Password</label>
                <input 
                    id="password"
                    type="password"
                    placeholder="Password"
                    required 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <p className={errorMsg ? "errormsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>

                <button className="btn btn--primary">Log in</button>
        </form>
    )
}

export default LoginForm;