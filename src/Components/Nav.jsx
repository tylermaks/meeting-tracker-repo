import "../Styles/Nav.scss"

function Nav(){

    const links=["About", "Events", "Learn", "Reports", "Media"]

    return(
        <nav>
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

export default Nav;