import { useState } from "react"
import api from "../API/userData"

function LoginForm({ handleClick }){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')


    const handlePost = async (e) => {
        e.preventDefault()

        try{
            api.post("/users", {
                "email": userName, 
                "pswd": password
            })
        } catch (error) {
            if (error.repsonse) {
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else {
                console.log(`Error: ${error.message}`)
            }
        }
    }

    return(
        <>
            <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    placeholder="Email"
                    required
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    placeholder="Password"
                    required 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button>Log in</button>

                <div>
                    <span onClick={handleClick}>Register Here</span>
                    <a href=".login">Lost you password?</a>
                </div>
        </>
    )
}

export default LoginForm;