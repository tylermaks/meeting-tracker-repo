import { useState} from 'react'
import api from "../API/userData"

function RegForm({ handleClick }) {
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlePost = (e) => {
        e.preventDefault();

        try{
            api.post("/register", {
                "fName": fName, 
                "lName": lName,
                "email": email, 
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
            <input 
                type="text" 
                placeholder="First Name"
                required
                value={fName}
                onChange={e => setFName(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input 
                type="text"
                placeholder="Last name"
                required 
                value={lName}
                onChange={e => setLName(e.target.value)}
            />
            
            <input 
                type="text" 
                placeholder="Email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input 
                type="password"
                placeholder="Password"
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handlePost}>Register</button>
            <div>
                <span onClick={handleClick}>Have an account? Login</span>
            </div>
        </>
    )
}

export default RegForm;