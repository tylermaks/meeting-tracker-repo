import "../Styles/MainNav.scss"

function MainNav(){

    const links=["About", "Events", "Learn", "Reports", "Media"]

    return(
        <nav id="main-nav">
            <ul id="nav-links">
                {
                    links.map( (link, id) => {
                        return(
                            <li key={id}>{link}</li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default MainNav;