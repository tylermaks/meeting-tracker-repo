import { useState } from 'react'
import useAuth from "../hooks/useAuth"
import Logout from './Logout'
import chevron from "../Images/chevron-down-solid.svg"
import '../Styles/UserDropdown.scss'

function UserDropdown(){ 
    const { auth } = useAuth()
    const [dropdown, setDropdown] = useState(true)

    const handleClick = () => {
        setDropdown(!dropdown)
    }

    return(
        <div id="user-dropdown" className="flex-col">
            <div className='user-info flex-row flex-row--center'>
                <div className="user-profile flex-row flex-row--center">{auth.fName[0]}</div>
                <p>
                    {`${auth.fName} ${auth.lName}`}
                    <img className="icon icon--small" onClick={handleClick} src={chevron} alt="User Dropdown Button" />
                </p>
            </div>
            
            {   
                dropdown ? <Logout /> : null
            }

        </div>
    )
}

export default UserDropdown;