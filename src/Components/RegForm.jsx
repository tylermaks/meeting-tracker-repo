import { useState } from 'react'

function RegForm({ handleClick }) {
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


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
            <button>Log in</button>
            <div>
                <span onClick={handleClick}>Have an account? Login</span>
            </div>
        </>
    )
}

export default RegForm;