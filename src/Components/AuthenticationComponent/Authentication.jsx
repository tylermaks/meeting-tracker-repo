import LoginForm from './LoginForm'
import logo from "../../Images/logo-white.png"
import "../../Styles/Authentication/Login.scss"
import WelcomeModal from './WelcomeModal';

function Authentication(){
    return(
        <section id="login" className="flex-column flex-column--center">
            <img src={logo} alt="Company Logo" />
            <LoginForm/>
            <WelcomeModal />
        </section>
    )
}

export default Authentication;