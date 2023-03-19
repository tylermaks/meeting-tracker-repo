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
                <MenuNav 
                    handleClick={handleClick}
                />
                <section id="main-view">
                    <HomeNav />
                    <Dashboard 
                        dash={dash}
                    />
                </section>
            </section>
        </UserProvider>
    )
}

export default Home;