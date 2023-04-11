import UserDropdown from "./UserDropdown";
import logo from "../../Images/logo.png"
import "../../Styles/Home/Home.scss"

function HomeNav(){
    return(
        <div id="home-nav" className="flex-row flex-row--space">
            <img src={logo} alt="logo" />
            <UserDropdown />
        </div>
    )
}

export default HomeNav;