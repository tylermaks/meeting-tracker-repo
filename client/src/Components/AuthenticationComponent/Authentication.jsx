import LoginForm from './LoginForm'
import "../../Styles/Authentication/Login.scss"

function Authentication(){
    return(
        <section id="login" className="flex-column flex-column--center">
            <h1>Logo</h1>
            <LoginForm/>
        </section>
    )
}

export default Authentication;