import { useState, useEffect } from 'react'
import useAuth from "../hooks/useAuth"
import axios from '../API/userData'
import HomeNav from "./HomeNav";
import MenuNav from "./MenuNav";
import Dashboard from "./Dashboard";
import "../Styles/Home.scss"


function Home(){
    const { auth } = useAuth()
    const [dash, setDash] = useState(1)
    // const [meetingArr, setMeetingsArr] = useState()

    useEffect( () => {
        const getData = async () => { 
            try{
                const response = await axios.get(`/user/${auth.userName}`)
                //Return to create context that holds meetingArr
                // setMeetingsArr(response?.data?.meetingArr)
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
    },[auth]) 

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