import { useState } from "react"
import Logout from "../AuthenticationComponent/Logout"
import "../../Styles/Home/MobileNav.scss"
import hamburgerIcon from "../../Images/bars-solid.svg"

function MobileNav({ handleSetDashboardClick }){
    const [openMenu, setOpenMenu] = useState(false)
    const menuItems = ["Companies", "Hours", "Reports", "Settings"]

    const toggleMenu = () => [ 
        setOpenMenu(!openMenu)
    ]

    return(
        <nav id="mobile-nav">
            <div className="flex-row flex-row--right">
                <img 
                    src={hamburgerIcon} 
                    className="icon icon--md"
                    onClick={toggleMenu} 
                    alt="Menu Icon" 
                />
            </div>


            <div className={openMenu ? "mobile-menu-options flex-column flex-column--center" : "hidden"}>
                <ul>
                    {
                        menuItems.map( (item, i) => { 
                            return(
                                <li 
                                    key={i}
                                    onClick={() => {handleSetDashboardClick(i+1); toggleMenu()}}
                                >
                                    {item}
                                </li>
                            )
                        })
                    }
                    <li>     
                        <Logout />
                    </li>
                </ul>
           
            </div>
        </nav>
    )
}

export default MobileNav