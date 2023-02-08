import { useState } from 'react'
import LoginForm from './LoginForm'
import RegForm from './RegForm'
import "../Styles/Login.scss"

function Authentication(){
    const [reg, setReg] = useState(false)

    const handleClick = () => {
        setReg(!reg)
    }

    return(
        <section id="login" class="flex-column flex-column--center">
            <h1>Logo</h1>
            <form id="login-form" className="flex-column" onSubmit={e => e.preventDefault()}>
                { reg ? <RegForm handleClick={handleClick}/> : <LoginForm handleClick={handleClick}/> }
            </form>

        </section>
    )
}

export default Authentication;