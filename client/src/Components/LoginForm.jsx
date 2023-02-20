import { useState, useEffect, errRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import axios from "../API/userData"
const LOGIN_URL = '/auth'

function LoginForm(){
    //VARIABLES
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname

    //STATES
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    //EFFECTS
    useEffect(() => {
        setErrorMsg('')
    }, [userName, password])


    //FUNCTIONS
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post(
                LOGIN_URL, 
                JSON.stringify({"email":userName, "pswd":password}),
                {
                    headers: {'Content-Type': 'application/json'},
                }
            )
           
            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles
            const fName = response?.data?.fName
            const lName = response?.data?.lName


            setAuth({ roles, userName, fName, lName, accessToken })
            setUserName('')
            setPassword('')
            navigate(from, { replace: true })

        } catch (err) {
            console.log(err.response.status)
            if(!err?.response){
                setErrorMsg('No Server Response')
            } else if (err.reponse?.status === 400) { 
                setErrorMsg("Missing Username or Password")
            } else if (err.reponse?.status === 401) {
                setErrorMsg("Username or Password is incorrect")
            } else { 
                setErrorMsg("Login Failed")
            }

            // errRef.current.focus()
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

                <p ref={errRef} className={errorMsg ? "errormsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>

                <button>Log in</button>

                <div>
                    <span>Register Here</span>
                    <a href=".login">Lost you password?</a>
                </div>
        </form>
    )
}

export default LoginForm;