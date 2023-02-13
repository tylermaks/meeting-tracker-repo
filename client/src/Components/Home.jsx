import { useState, useEffect } from 'react'
import HomeNav from "./HomeNav";
import MenuNav from "./MenuNav";
import Dashboard from "./Dashboard";

import "../Styles/Home.scss"
import axios from 'axios';

function Home(){
    const [dash, setDash] = useState(1)


    //NEED TO FIX THIS
    // useEffect( () => {
    //     const getData = async () => { 
    //         const user = await axios.get( "/testtest@test.com")
    //         console.log(user)
    //     }

    //     getData()
    // },[])

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