import { useState, useEffect } from 'react'
import axios from 'axios';
import HomeNav from "./HomeNav";
import MenuNav from "./MenuNav";
import Dashboard from "./Dashboard";
import "../Styles/Home.scss"

function Home(){
    const [dash, setDash] = useState(1)
    const [userName, setUserName] = useState('')

    useEffect( () => {
        const getData = async () => { 
            try{
                const response = await axios.get("http://localhost:5000/user/1")
                setUserName(`${response.data.fName} ${response.data.lName}`)
            } catch (error) {
                if (error.repsonse) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else {
                    console.log(`Error: ${error.message}`)
                }
            }
        }

        getData()
    },[])

    const handleClick = (id) => { 
        setDash(id - 1)
    }

    return(
        <section id="home">
            <HomeNav 
                userName={userName}
            />
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