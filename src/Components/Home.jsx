import { useState } from 'react'
import HomeNav from "./HomeNav";
import MenuNav from "./MenuNav";
import Dashboard from "./Dashboard";

import "../Styles/Home.scss"

function Home(){

    const [dash, setDash] = useState(1)

    const handleClick = (id) => { 
        setDash(id - 1)
    }

    return(
        <section id="home">
            <HomeNav />
            <MenuNav 
                handleClick={handleClick}
            />
            <Dashboard 
                dash={dash}
            />
        </section>
    )
}

export default Home;