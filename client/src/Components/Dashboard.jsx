import { useState, useEffect } from 'react'
import useUser from "../hooks/useUser"
import Companies from "../Components/Companies"
import Hours from "../Components/Hours"
import Documents from "../Components/Documents"
import Options from "../Components/Options"
import "../Styles/Dashboard.scss"

function Dashboard({ dash }){
    const [userData, setUserData] = useState('')
    // const [load, setLoad] = useState('')
    const { user } = useUser()

    useEffect(() => {
        setUserData(user)
        // setLoad(false)
    },[user])

    console.log(user)

    const components = [
        <Companies />, 
        <Hours userData={userData}/>,
        <Documents />, 
        <Options />
    ]

    return(
        <main id="dashboard">
            { userData ? (
                <>  
                    {components[dash]}
                </>
                ):(
                    <section>
                        <p>Loading</p>
                    </section>
                )
            }
        </main>
    )
}

export default Dashboard;