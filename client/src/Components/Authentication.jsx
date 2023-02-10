import { useState, useEffect } from 'react'
import api from "../API/userData"
import LoginForm from './LoginForm'
import RegForm from './RegForm'
import "../Styles/Login.scss"

function Authentication(){
    const [user, setUser] = useState('')
    const [regForm, setRegForm] = useState(false)

    useEffect(() =>{
        const fetchUser = async () => {
            try{
                const response = await api.get('/users')
                setUser(response.data)
            } catch (err) {
                if (err.repsonse) {
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                } else {
                    console.log(`Error: ${err.message}`)
                }
            }
        }

        fetchUser()
    }, [])

    const handleClick = () => {
        setRegForm(!regForm)
    }

    console.log(user)

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