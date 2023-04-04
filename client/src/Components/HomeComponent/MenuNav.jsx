import { useState } from "react"
import bolt from "../../Images/bolt-solid.svg"
import meetings from "../../Images/calendar-regular.svg"
import files from "../../Images/file-lines-solid.svg"
import gear from "../../Images/gear-solid.svg"
import "../../Styles/MenuNav.scss"

const menuOptions = [
    { id: 1, name: "Companies", icon: bolt },
    { id: 2, name: "Hours", icon: meetings },
    { id:3, name:"Documents", icon: files },
    { id:4, name: "Options", icon: gear }
]



function MenuNav({ handleClick, activeDashboard }){
    const [hover, setHover] = useState([])
    
    return(
        <nav id="menu-nav" className="flex-column">
            {
                menuOptions.map( option => {
                    return(
                        <div 
                            key={option.id} 
                            className= "menu-opt flex-column" 
                            onClick={() => handleClick(option.id)}
                            onMouseEnter={() => setHover([...hover, option.id])}
                            onMouseLeave={() => setHover(hover.filter( i => i !== option.id))}
                        >
                            <div className={option.id === activeDashboard + 1 ? "icon-active icon-container" : "icon-container"}>
                                <img 
                                    className={option.id === activeDashboard + 1 ? "icon--active icon--lg" : "icon icon--lg"}
                                    src={option.icon} 
                                    alt={`${option.name} Icon`} 
                                />
                            </div>
                           
                            <div className={hover.includes(option.id) ? "main-menu-hover" : "hidden"}>
                                {option.name}
                            </div>
                        </div>
                    )
                })
            }

        </nav>
    )
}

export default MenuNav;