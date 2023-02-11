import { useState, useEffect } from 'react'
import api from "../API/userData"
import LoginForm from './LoginForm'
import RegForm from './RegForm'
import "../Styles/Login.scss"

function Authentication(){
    const [user, setUser] = useState('')
    const [regForm, setRegForm] = useState(false)

    const handleClick = () => {
        setRegForm(!regForm)
    }

    return(
        <section id="login" className="flex-column flex-column--center">
            <h1>Logo</h1>
            <form id="login-form" className="flex-column" onSubmit={e => e.preventDefault()}>
                { regForm ? <RegForm handleClick={handleClick}/> : <LoginForm handleClick={handleClick}/> }
            </form>

        </section>
    )
}

export default Authentication;