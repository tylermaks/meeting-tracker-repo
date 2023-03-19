import { useState } from 'react'
import useAuth from "../hooks/useAuth"
import Logout from './Logout'
import '../Styles/UserDropdown.scss'

function UserDropdown(){ 
    const { auth } = useAuth()
    const [dropdown, setDropdown] = useState(false)

    const handleClick = () => {
        setDropdown(!dropdown)
    }

    return(
        <div id="user-dropdown" className="flex-col">
            <div 
                className="user-profile flex-row flex-row--center"
                onClick={handleClick}
            >
                {auth.fName[0]}{auth.lName[0]}
            </div>            
            {   
                dropdown ? <Logout /> : null
            }
        </div>
    )
}

export default UserDropdown;