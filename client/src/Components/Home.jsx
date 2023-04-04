import { useState } from 'react'
import { UserProvider } from "../context/UserProvider"
import HomeNav from "./HomeNav";
import MenuNav from "./MenuNav";
import Dashboard from "./Dashboard";
import "../Styles/Home.scss"


function Home(){
    const [activeDashboard, setActiveDashboard] = useState(1)
    const handleClick = (id) => {
        setActiveDashboard(id - 1) 
    }

    return(
        <UserProvider>
            <section id="home">
                <MenuNav 
                    handleClick={handleClick}
                    activeDashboard={activeDashboard} //adjusting for handleClick
                />
                <section id="main-view">
                    <HomeNav />
                    <Dashboard 
                        activeDashboard={activeDashboard}
                    />
                </section>
            </section>
        </UserProvider>
    )
}

export default Home;