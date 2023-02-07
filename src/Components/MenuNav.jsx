import "../Styles/MenuNav.scss"
import bolt from "../Images/bolt-solid.svg"
import meetings from "../Images/calendar-regular.svg"
import files from "../Images/file-lines-solid.svg"
import gear from "../Images/gear-solid.svg"

const menuOpt = [
    {
        id: 1,
        name: "Companies",
        icon: bolt 
    },

    {
        id: 2, 
        name: "Hours",
        icon: meetings
    },

    {
        id:3, 
        name:"Files",
        icon: files
    },

    {
        id:4, 
        name: "Options",
        icon: gear
    }
]


function MenuNav(){
    return(
        <nav id="menu-nav" className="flex-column">
            {
                menuOpt.map( opt => {
                    return(
                        <div key={opt.id} className="menu-opt flex-row">
                            <img className="icon icon--md" src={opt.icon} alt={`${opt.name} Icon`} />
                            <p>{opt.name}</p>
                        </div>
                    )
                })
            }

        </nav>
    )
}

export default MenuNav;