import '../Styles/UserDropdown.scss'
import chevron from "../Images/chevron-down-solid.svg"

function UserDropdown(){ 
    return(
        <div id="user-dropdown" className="flex-row">
            <div class="flex-row flex-row--center">TM</div>
            <p>
                Tyler M 
                <img className="icon icon--small" src={chevron} alt="User Dropdown Button" />
            </p>
        </div>
    )
}

export default UserDropdown;