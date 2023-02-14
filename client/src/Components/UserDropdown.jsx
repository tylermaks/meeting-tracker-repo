import '../Styles/UserDropdown.scss'
import chevron from "../Images/chevron-down-solid.svg"

function UserDropdown({ userName }){ 
    return(
        <div id="user-dropdown" className="flex-row">
            <div className="flex-row flex-row--center">{userName[0]}</div>
            <p>
                {userName}
                <img className="icon icon--small" src={chevron} alt="User Dropdown Button" />
            </p>
        </div>
    )
}

export default UserDropdown;