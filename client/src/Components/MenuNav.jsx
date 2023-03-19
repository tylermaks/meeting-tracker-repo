import { useState } from "react"
import bolt from "../Images/bolt-solid.svg"
import meetings from "../Images/calendar-regular.svg"
import files from "../Images/file-lines-solid.svg"
import gear from "../Images/gear-solid.svg"
import "../Styles/MenuNav.scss"

const menuOpt = [
    { id: 1, name: "Companies", icon: bolt },
    { id: 2, name: "Hours", icon: meetings },
    { id:3, name:"Documents", icon: files },
    { id:4, name: "Options", icon: gear }
]



function MenuNav({ handleClick }){
    const [hover, setHover] = useState([])
    
    return(
        <nav id="menu-nav" className="flex-column">
            {
                menuOpt.map( opt => {
                    return(
                        <div 
                            key={opt.id} 
                            className="menu-opt flex-column" 
                            onClick={() => handleClick(opt.id)}
                            onMouseEnter={() => setHover([...hover, opt.id])}
                            onMouseLeave={() => setHover(hover.filter( i => i !== opt.id))}
                        >
                            <img className="icon icon--lg" src={opt.icon} alt={`${opt.name} Icon`} />
                            <div className={hover.includes(opt.id) ? "main-menu-hover" : "hidden"}>
                                {opt.name}
                            </div>
                        </div>
                    )
                })
            }

        </nav>
    )
}

export default MenuNav;