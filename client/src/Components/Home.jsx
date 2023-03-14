import { useState } from 'react'
import { UserProvider } from "../context/UserProvider"
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
        <UserProvider>
            <section id="home">
                <HomeNav />
                <MenuNav 
                    handleClick={handleClick}
                />
                <Dashboard 
                    dash={dash}
                />
            </section>
        </UserProvider>
    )
}

export default Home;