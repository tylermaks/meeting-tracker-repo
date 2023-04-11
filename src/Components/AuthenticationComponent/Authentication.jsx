import LoginForm from './LoginForm'
import "../../Styles/Authentication/Login.scss"
import WelcomeModal from './WelcomeModal';

function Authentication(){
    return(
        <section id="login" className="flex-column flex-column--center">
            <h1>Logo</h1>
            <LoginForm/>
            <WelcomeModal />
        </section>
    )
}

export default Authentication;