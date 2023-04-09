import UserDropdown from "./UserDropdown";
import "../../Styles/Home/Home.scss"

function HomeNav(){
    return(
        <div id="home-nav" className="flex-row flex-row--space">
            <h2>Logo</h2>
            <UserDropdown />
        </div>
    )
}

export default HomeNav;