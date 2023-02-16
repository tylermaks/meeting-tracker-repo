import useAuth from "../hooks/useAuth"
import '../Styles/UserDropdown.scss'
import chevron from "../Images/chevron-down-solid.svg"

function UserDropdown(){ 
    const context = useAuth()
    const user = context.auth

    return(
        <div id="user-dropdown" className="flex-row">
            <div className="flex-row flex-row--center">{user.fName[0]}</div>
            <p>
                {`${user.fName} ${user.lName}`}
                <img className="icon icon--small" src={chevron} alt="User Dropdown Button" />
            </p>
        </div>
    )
}

export default UserDropdown;