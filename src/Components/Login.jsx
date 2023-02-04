import { useState } from 'react'

import "../Styles/Login.scss"

function Login(){

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    return(
        <section id="login" class="flex-column flex-column--center">
            <h1>Logo</h1>
            <form id="login-form" className="flex-column" onSubmit={e => e.preventDefault()}>
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
                    <a href='.login'>Register Here</a>
                    <a href=".login">Lost you password?</a>
                </div>
            </form>

        </section>
    )
}

export default Login;